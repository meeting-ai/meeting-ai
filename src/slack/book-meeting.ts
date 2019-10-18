import { App, Context, SlashCommand,  } from "@slack/bolt";
import { IProcessed } from "../services/nlp/types";
import { Option } from "@slack/types";

interface BookMeeting {
  app: App;
  context: Context;
  slashCommand: SlashCommand;
  nlp: IProcessed;
}

const rooms: Option[] = [
  {
    "text": { "text": "Smalls", "type": "plain_text" },
    "value": "DTWSmalls@dynatrace.com"
  },
  {
    "text": { "text": "The Fox", "type": "plain_text" },
    "value": "dtwthefox5c-8@dynatrace.com"
  },
  {
    "text": { "text": "The Majestic", "type": "plain_text" },
    "value": "dtwthemajestic@dynatrace.com"
  },
  {
    "text": { "text": "The Shelter", "type": "plain_text" },
    "value": "dtwshelter5F@dynatrace.com"
  },
  {
    "text": { "text": "The Gem", "type": "plain_text" },
    "value": "dtwthegem4C@dynatrace.com"
  },
  {
    "text": { "text": "The Joe", "type": "plain_text" },
    "value": "DTWTheJoe5c-12@dynatrace.com"
  },
  {
    "text": { "text": "The Filmore", "type": "plain_text" },
    "value": "dtwthefilmore4F@dynatrace.com"
  },
  {
    "text": { "text": "212 Room", "type": "plain_text" },
    "value": "dtwthe212room@dynatrace.com"
  },
  {
    "text": { "text": "Outer rink", "type": "plain_text" },
    "value": "DTWTheOuterRink@dynatrace.com"
  },
  {
    "text": { "text": "Roller rink", "type": "plain_text" },
    "value": "DTWTheRollerRink@dynatrace.com"
  }
];

export async function bookMeeting(options: BookMeeting): Promise<void> {

  const users = options.nlp.entities.filter(e => e.entity === "hashtag").map(e => e.sourceText.replace("#", ""));

  const askedRoom = options.nlp.entities.filter(e => e.entity === "room");

  console.log(JSON.stringify(options.nlp, null, 2));
  let selectedRoom;
  if (askedRoom.length > 0) {
    selectedRoom = rooms.find(r => r.value === askedRoom[0].option );
  } else {
    selectedRoom = rooms[0];
  }
  
  const date = new Date();

  console.log(users)
  await options.app.client.views.open({
    token: options.context.botToken,
    trigger_id: options.slashCommand.trigger_id,
    callback_id: "book-room",
    view: {
      callback_id: "book-room",
      private_metadata: options.slashCommand.channel_id,
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
            "text": `*:wave: Hi ${options.slashCommand.user_name}!* Let's set up your meeting:`
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
            "initial_users": users,
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
            "initial_date": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
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
            "initial_option": {
              "text": { "text": "3:00pm", "type": "plain_text" },
              "value": "15:00"
            },
            "options": [
              {
                "text": { "text": "1:00pm", "type": "plain_text" },
                "value": "13:00"
              },
              {
                "text": { "text": "1:30pm", "type": "plain_text" },
                "value": "13:30"
              },
              {
                "text": { "text": "2:00pm", "type": "plain_text" },
                "value": "14:00"
              },
              {
                "text": { "text": "2:30pm", "type": "plain_text" },
                "value": "14:30"
              },
              {
                "text": { "text": "3:00pm", "type": "plain_text" },
                "value": "15:00"
              },
              {
                "text": { "text": "3:30pm", "type": "plain_text" },
                "value": "15:30"
              },
              {
                "text": { "text": "4:00pm", "type": "plain_text" },
                "value": "16:00"
              },
              {
                "text": { "text": "4:30pm", "type": "plain_text" },
                "value": "16:30"
              },
              {
                "text": { "text": "5:00pm", "type": "plain_text" },
                "value": "17:00"
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
            "initial_option": {
              "text": { "type": "plain_text", "text": "30 minutes" },
              "value": "30"
            },
            "options": [
              {
                "text": { "type": "plain_text", "text": "15 minutes" },
                "value": "15"
              },
              {
                "text": { "type": "plain_text", "text": "30 minutes" },
                "value": "30"
              },
              {
                "text": { "type": "plain_text", "text": "60 minutes" },
                "value": "60"
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
            "options": rooms,
            "initial_option": selectedRoom,
          }
        },
        {
          "type": "divider"
        },
      ]
    }
  });
}