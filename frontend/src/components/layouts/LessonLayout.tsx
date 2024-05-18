import { LessonType } from "@/utils/lesson.types";
import LessonNavBar from "../navbars/LessonNavBar";

interface Props {
  children: React.ReactNode;
  percentage: number;
  currentQuestion: number;
  questionsLength: number;
}

export default function LessonLayout({
  percentage,
  children,
  currentQuestion,
  questionsLength,
}: Props) {
  return (
    <>
      <LessonNavBar
        percentage={percentage}
        currentQuestion={currentQuestion}
        questionsLength={questionsLength}
      />
      {children}
    </>
  );
}
