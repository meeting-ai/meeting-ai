export const helpId = "help";

const helpPhrases: string[] = ["help", "i need help", "what can you do"];

export const helpPrompt: IPhraseDefinition = {
  id: helpId,
  phrases: helpPhrases
};

export interface IPhraseDefinition {
  id: string;
  phrases: string[];
}
