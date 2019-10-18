import { IPhraseDefinition } from "./types";

export const logoutId = "logout";
const logoutPhrases: string[] = [
  `log me out`,
  `log out`,
  `I don't want to be signed in anymore`,
  `get me out of here`,
  `unsubscribe`,
  `logout`,
  `quit`,
  `cancel`,
  `exit`,
  `fuck you`,
  `piss off`,
  `shut the fuck up`,
  `gtfo`,
  `stfu`,
  `l8r`
];

export const logoutPrompt: IPhraseDefinition = {
  id: logoutId,
  phrases: logoutPhrases
};
