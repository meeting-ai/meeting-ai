import { NlpManager } from "node-nlp";
import { EN } from "../util/constants";
import { bookingPrompt } from "./booking";
import { helpPrompt } from "./help";

const phraseManager = new NlpManager({ languages: [EN] });

function loadPhrases(manager: NlpManager) {
  bookingPrompt.phrases.forEach(phrase => {
    manager.addDocument(EN, phrase, bookingPrompt.id);
  });

  helpPrompt.phrases.forEach(phrase => {
    manager.addDocument(EN, phrase, helpPrompt.id);
  });
}

export { phraseManager, loadPhrases };
