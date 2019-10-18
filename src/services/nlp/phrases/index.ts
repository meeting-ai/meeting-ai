import { NlpManager } from "node-nlp";
import { EN } from "../util/constants";
import { availabilityId, availabilityPrompt } from "./availability";
import { bookingId, bookingPrompt } from "./booking";
import { logoutId, logoutPrompt } from "./logout";
import { helpId, helpPrompt } from "./help";
import { IPhraseDefinition } from "./types";

const phraseManager = new NlpManager({ languages: [EN] });

function loadPhrases(manager: NlpManager) {
  loadFromDefinitions(manager, bookingPrompt);
  loadFromDefinitions(manager, logoutPrompt);
  loadFromDefinitions(manager, availabilityPrompt);
  loadFromDefinitions(manager, helpPrompt);
}

function loadFromDefinitions(manager: NlpManager, prompt: IPhraseDefinition) {
  prompt.phrases.forEach(phrase => {
    manager.addDocument(EN, phrase, prompt.id);
  });

  helpPrompt.phrases.forEach(phrase => {
    manager.addDocument(EN, phrase, helpPrompt.id);
  });
}

export {
  phraseManager,
  loadPhrases,
  bookingId,
  helpId,
  logoutId,
  availabilityId
};
