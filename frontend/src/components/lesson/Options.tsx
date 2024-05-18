import { cn } from "@/utils/cn";
import { LessonLearningType } from "@/utils/lesson-content.types";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  content: LessonLearningType;
  setWrong: Dispatch<SetStateAction<boolean>>;
  answer: string | null;
  setAnswer: Dispatch<SetStateAction<string | null>>;
  disabled?: boolean;
}

export default function Options({
  content,
  setWrong,
  answer,
  setAnswer,
  disabled,
}: Props) {
  useEffect(() => {
    setWrong(answer != content.answer.meaning);
  }, [answer]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {content.options.map((option, index) => (
        <button
          key={index}
          onClick={() => setAnswer(option)}
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-center px-6 border border-b-4 py-3.5 rounded-xl transition-all active:border active:mt-[3px]",
            answer == option
              ? answer == content.answer.meaning ||
                answer == content.answer.pronunciation
                ? "border-blue-500 bg-blue-600"
                : "border-red-600 bg-red-700"
              : "border-neutral-700 bg-neutral-800"
          )}
        >
          <div>{option}</div>
          <div className="absolute ml-60">
            {answer == option &&
              (answer == content.answer.meaning ||
              answer == content.answer.pronunciation ? (
                <CheckCircle weight="fill" size={24} />
              ) : (
                <XCircle weight="fill" size={24} />
              ))}
          </div>
        </button>
      ))}
    </div>
  );
}
