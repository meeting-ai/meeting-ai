import "dotenv/config";

import { App, ExpressReceiver } from "@slack/bolt";
import { config } from "./config";
import { configure } from "./auth";
import { configure as configureSlack } from "./slack";
import "./db";

async function start() {
  try {
    const expressReceiver = new ExpressReceiver({
      signingSecret: config.slack.signingSecret || ""
    });

    const app = new App({
      signingSecret: config.slack.signingSecret,
      token: config.slack.token,
      receiver: expressReceiver
    });

    configure(expressReceiver.app);
    configureSlack(app);

    await app.start(config.express.port);
    console.log("⚡️ Bolt app is running!");
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

start();
