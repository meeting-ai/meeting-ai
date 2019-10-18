import { IPhraseDefinition } from "./types";

export const availabilityId = "availability.specific";
const availabilityPhrases: string[] = [
  `is %room% free`,
  `is %room% free now`,
  `is %room% free right now`,
  `is %room% free at %datetime%`,
  `is %room% free around %datetime%`,
  `is %room% open`,
  `is %room% open now`,
  `is %room% open right now`,
  `is %room% open at %datetime%`,
  `is %room% open around %datetime%`,
  `is %room% taken`,
  `is %room% taken now`,
  `is %room% taken right now`,
  `is %room% taken at %datetime%`,
  `is %room% taken around %datetime%`,
  `availability of %room%`
];

export const availabilityPrompt: IPhraseDefinition = {
  id: availabilityId,
  phrases: availabilityPhrases
};
