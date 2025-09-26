
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
}
