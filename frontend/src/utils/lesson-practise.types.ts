export enum PractiseType {
  MATCHING = "MATCHING",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  WRITING = "WRITING",
  PRONUNCIATION = "PRONUNCIATION",
}

export type LessonPractiseType = {
  type: PractiseType.MATCHING;
  options: MatchingType;
};

export type MatchingType = {
  pairs: string[][];
  answers: string[][];
};
