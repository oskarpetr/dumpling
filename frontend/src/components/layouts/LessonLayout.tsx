import { LessonType } from "@/utils/lesson.types";
import LessonNavBar from "../navbars/LessonNavBar";

interface Props {
  children: React.ReactNode;
  percentage: number;
  lesson: LessonType;
}

export default function LessonLayout({ percentage, lesson, children }: Props) {
  return (
    <>
      <LessonNavBar percentage={percentage} lesson={lesson} />
      {children}
    </>
  );
}
