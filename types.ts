export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
  URDU = 'ur',
}

export interface MedicineInfo {
  composition: string;
  uses: string;
  sideEffects: string;
  timeToTake: string;
  disclaimer: string;
  safetyInCondition?: string;
  conditionContext?: string; // To store the user-provided condition for UI display
}

export interface DosageInfo {
    dosageSuggestion: string;
    reasoning: string;
    importantNotes: string;
    disclaimer: string;
}
