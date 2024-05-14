export enum PractiseType {
  MATCHING,
  MULTIPLE_CHOICE,
  WRITING,
  PRONUNCIATION,
}

export type LessonPractiseType = {
  type: PractiseType.MATCHING;
  options: {
    pairs: string[][];
    answers: string[][];
  };
};
