import { cn } from "@/utils/cn";
import { WordType } from "@/utils/word.types";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  options: string[];
  correct: WordType;
  setWrong: Dispatch<SetStateAction<boolean>>;
  answer: string | null;
  setAnswer: Dispatch<SetStateAction<string | null>>;
}

export default function Options({
  options,
  correct,
  setWrong,
  answer,
  setAnswer,
}: Props) {
  useEffect(() => {
    setWrong(answer !== correct.meaning);
  }, [answer]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => setAnswer(option)}
          className={`${
            answer === option
              ? answer === correct.meaning
                ? "border-blue-500 bg-blue-600"
                : "border-red-600 bg-red-700"
              : "border-neutral-700 bg-neutral-800"
          } w-full flex items-center justify-center px-6 border border-b-4 py-3.5 rounded-xl transition-all active:border active:mt-[3px]`}
        >
          <div>{option}</div>
          <div className="absolute ml-60">
            {answer === option && (
              <>
                {answer === correct.meaning ? (
                  <CheckCircle weight="fill" size={24} />
                ) : (
                  <XCircle weight="fill" size={24} />
                )}
              </>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
