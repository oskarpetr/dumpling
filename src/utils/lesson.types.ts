import { WordType } from "./word.types";

export interface LessonType {
  id: string;
  name: string;
  translation: string;
  words: WordType[];
}
