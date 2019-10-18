import { App } from "@slack/bolt";

export const configure = (app: App) => {
  app.command("/meet", async ({ command, ack, say, context, payload }) => {
    // Acknowledge command request
    ack();
    say({
      channel: payload.channel_id,
      text: `you said: ${command.text}`,
    }) ;
  });
}
