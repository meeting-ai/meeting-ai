import { App } from "@slack/bolt";
import { process } from "../services/nlp";
import { bookMeeting } from "./book-meeting";
import { helpResponse } from "./help";

export const configure = (app: App) => {
  app.command("/meet", async ({ command, context, payload, ack, respond }) => {
    ack();

    if (context.oauth === undefined) {
      return
    } 

    const sanitizedText = command.text.replace(/<@([0-9A-Z]+)\|([0-9a-zA-Z_.]+)>/g, "#$1");

    const nlpResponse = await process(sanitizedText);


    if (nlpResponse.intent === "booking.prompt") {
      await bookMeeting({
        app,
        context,
        slashCommand: payload,
        nlp: nlpResponse,
      });
    } if (nlpResponse.intent === "help") {
      await helpResponse(respond);
    } else {
      await helpResponse(respond);
    }
  });

  app.view("book-room", async ({ ack, body, context, payload }) => {
    // Acknowledge the view_submission event
    ack();

    app.client.chat.postMessage({
      token: context.botToken,
      channel: payload.private_metadata,
      text: 'Your meeting has been booked! 👍'
    });
  });

}
