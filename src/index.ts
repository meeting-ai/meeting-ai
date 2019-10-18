import "dotenv/config";

import { App, ExpressReceiver, Middleware } from "@slack/bolt";
import { authMiddleware } from "./auth";
import { loadMongo } from "./db";
import { Application } from "express";
import { config } from "./config";
import routes from "./routes";
import { configure as configureSlack } from "./slack";
import { loadNlp } from "./services/nlp";

async function start() {
  await loadMongo();
  try {
    const expressReceiver = new ExpressReceiver({
      signingSecret: config.slack.signingSecret || ""
    });

    const app = new App({
      signingSecret: config.slack.signingSecret,
      token: config.slack.token,
      receiver: expressReceiver
    });

    app.use(authMiddleware as Middleware<{}>);
    await loadNlp();

    (expressReceiver.app as Application).use("/", routes);
    configureSlack(app);

    await app.start(config.express.port);
    console.log("⚡️ Bolt app is running!");
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

start();
