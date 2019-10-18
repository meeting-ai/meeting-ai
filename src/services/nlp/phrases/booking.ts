import { IPhraseDefinition } from "./types";

export const bookingId = "booking.prompt";
const bookingPhrases: string[] = [
  `in %room%`,
  `in %room% at %datetime%`,
  `in %room% around %datetime%`,
  `at %datetime% in %room%`,
  `around %datetime% in %room%`,
  "in Smalls with #beeme1mr",
  "with #beemer and #arnaud in Smalls",
  "in smalls with #beemer and #arnaud",
  "with #beemer and #arnaud",
  "with #beemer and #arnaud in Smalls",
  "in smalls with #beemer and #arnaud",
  "with #beemer and #arnaud"
];

export const bookingPrompt: IPhraseDefinition = {
  id: bookingId,
  phrases: bookingPhrases
};
