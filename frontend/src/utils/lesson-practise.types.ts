import { WordType } from "./word.types";

export enum PractiseType {
  MATCHING = "MATCHING",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  WRITING = "WRITING",
  PRONUNCIATION = "PRONUNCIATION",
}

export type LessonPractiseType =
  | {
      type: PractiseType.MATCHING;
      task: MatchingType;
    }
  | {
      type: PractiseType.MULTIPLE_CHOICE;
      task: MultipleChoiceType;
    }
  | {
      type: PractiseType.PRONUNCIATION;
      task: MultipleChoiceType;
    }
  | {
      type: PractiseType.WRITING;
      task: WritingType;
    };

export type MatchingType = {
  pairs: string[][];
  answers: string[][];
};

export type MultipleChoiceType = {
  answer: WordType;
  options: string[];
};

export type WritingType = {
  answer: WordType;
  meaning: string;
};
