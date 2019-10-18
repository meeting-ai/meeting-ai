import { IPhraseDefinition } from "./types";

export const bookingId = "booking.prompt";
const bookingPhrases: string[] = [
  `in %room%`,
  `in %room% at %datetime%`,
  `in %room% around %datetime%`,
  `at %datetime% in %room%`,
  `around %datetime% in %room%`
];

export const bookingPrompt: IPhraseDefinition = {
  id: bookingId,
  phrases: bookingPhrases
};
