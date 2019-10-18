import { App } from "@slack/bolt";

export const configure = (app: App) => {
  app.command("/meet", async ({ command, ack, respond }) => {
    // Acknowledge command request
    ack();
    respond({
      text: `you said: ${command.text}`,
    }) ;
  });
}
