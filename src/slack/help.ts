import { RespondFn } from "@slack/bolt";

export async function helpResponse(respond: RespondFn): Promise<void> {
  return respond({
    response_type: 'ephemeral',
    text: "hi",
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Hey there 👋 I'm MeetingAI. I'm here to help you book outlook events in Slack.\nThere are two ways to quickly create tasks:"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*:woman-raising-hand::skin-tone-2: Use the `/meet` command*.\nType `/meet` followed by a short description of your meeting request and required members and prompt you for more information. Try it out by using the `/meet` command in this channel."
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*:thinking_face: More examples*.\n`/meet in smalls right now`\n`/meet in the fox at 1pm with @cody`"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "❓Get help at any time with `/meet help` or type *help* in a DM with me"
          }
        ]
      }
    ],
  })
}