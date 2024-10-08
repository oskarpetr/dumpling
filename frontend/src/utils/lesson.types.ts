import { WordType } from "./word.types";

export interface LessonType {
  lessonId: string;
  name: string;
  translation: string;
  words: WordType[];
  bestScore: number;
  practised: number;
}
