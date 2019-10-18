import "dotenv/config";

import { App, ExpressReceiver } from "@slack/bolt";
import { configure as configureSlack } from "./slack";
import { Application } from "express";
import routes from './routes';

async function start() {
  try {
    const expressReceiver = new ExpressReceiver({
      signingSecret: process.env.SLACK_SIGNING_SECRET || "",
    });
    
    const app = new App({
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      token: process.env.SLACK_TOKEN,
      receiver: expressReceiver
    });
    
    (expressReceiver.app as Application).use('/', routes);
    configureSlack(app);

    await app.start(process.env.PORT || 3000);
    console.log("⚡️ Bolt app is running!")
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
}

start();
