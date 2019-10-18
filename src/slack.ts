import { App } from "@slack/bolt";

export const configure = (app: App) => {
  app.command("/meet", async ({ command, ack, say, context, payload }) => {
    console.log(JSON.stringify(payload, null, 2));
    // Acknowledge command request
    ack({ text: "test" });
    say({
      channel: payload.channel_id,
      text: `you said: ${command.text}`,
    }) ;
  });
}
