import yargs from "yargs";

import type { Competitor } from "./types";
import { logger } from "./logger";
import { scoring } from "./scoring";

async function main() {
  const argv = await yargs
    .option("id", {
      type: "string",
      demandOption: true,
    })
    .option("url", {
      type: "string",
      demandOption: true,
    })
    .help().argv;

  const competitor: Competitor = {
    id: argv.id,
    url: argv.url,
  };
  console.log("====competitor====");
  console.log(process.env["WSH_SCORING_TARGET_PATHS"]);

  const targetPaths = JSON.parse(
    process.env["WSH_SCORING_TARGET_PATHS"] as string
  );
  console.log("====targetPaths====2", targetPaths);

  const result = await scoring(competitor, targetPaths);

  if ("error" in result.result) {
    throw result.result.error;
  }
  console.log(`::set-output name=export::${JSON.stringify(result)}`);
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
