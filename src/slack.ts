import { App } from "@slack/bolt";

export const configure = (app: App) => {
  app.command("/meet", async ({ command, context, payload, ack, respond }) => {
    // Acknowledge command request
    console.log(command.text);

    ack();
  
    await app.client.views.open({
      token: context.botToken,
      trigger_id: payload.trigger_id,
      action_id: "test",
      view: {
        "callback_id": '123',
        "type": "modal",
        "title": {
          "type": "plain_text",
          "text": "New meeting setup",
          "emoji": true
        },
        "submit": {
          "type": "plain_text",
          "text": "Submit",
          "emoji": true
        },
        "close": {
          "type": "plain_text",
          "text": "Cancel",
          "emoji": true
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `*:wave: Hi ${command.user_name}!* Let's set up your meeting:`
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": ":busts_in_silhouette:  *Attendees*\nChoose who should be included in this meeting"
            },
            "accessory": {
              "type": "multi_users_select",
              "placeholder": {
                "type": "plain_text",
                "text": "Select User"
              },
              "initial_users": []
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": ":spiral_calendar_pad: *Date*\nChoose what day your meeting takes place"
            },
            "accessory": {
              "type": "datepicker",
              "initial_date": "1990-04-28",
              "placeholder": {
                "type": "plain_text",
                "text": "Pick date",
                "emoji": true
              }
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": ":alarm_clock: *Time*\nChoose what time your meetings starts"
            },
            "accessory": {
              "type": "static_select",
              "placeholder": {
                "type": "plain_text",
                "text": "Pick time",
                "emoji": true
              },
              "options": [
                {
                  "text": {
                    "type": "plain_text",
                    "text": "Choice 1",
                    "emoji": true
                  },
                  "value": "value-0"
                }
              ]
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": ":hourglass: *Duration*\nChoose how long your meeting lasts"
            },
            "accessory": {
              "type": "static_select",
              "placeholder": {
                "type": "plain_text",
                "text": "Pick duration",
                "emoji": true
              },
              "options": [
                {
                  "text": {
                    "type": "plain_text",
                    "text": "My events",
                    "emoji": true
                  },
                  "value": "value-0"
                }
              ]
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": ":office: *Location*\nChoose an available conference room"
            },
            "accessory": {
              "type": "static_select",
              "placeholder": {
                "type": "plain_text",
                "text": "Pick location",
                "emoji": true
              },
              "options": [
                {
                  "text": {
                    "type": "plain_text",
                    "text": "My events",
                    "emoji": true
                  },
                  "value": "value-0"
                }
              ]
            }
          },
          {
            "type": "divider"
          },
        ]
      }
    });
  });
}
