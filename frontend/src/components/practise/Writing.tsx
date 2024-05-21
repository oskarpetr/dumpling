import Image from "next/image";
import { motion } from "framer-motion";
import WordTooltip from "../modals/WordTooltip";
import { Dispatch, SetStateAction, useState } from "react";
import {
  LessonPractiseType,
  PractiseType,
} from "@/utils/lesson-practise.types";
import { cn } from "@/utils/cn";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

interface Props {
  question: LessonPractiseType;
  setAnswered: Dispatch<SetStateAction<boolean>>;
  setCorrectly: Dispatch<SetStateAction<number>>;
}

export default function Writing({
  question,
  setAnswered,
  setCorrectly,
}: Props) {
  // tooltip state
  const [wordTooltip, setWordTooltip] = useState(false);

  // unused state
  const [wrong, setWrong] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [evaluate, setEvaluate] = useState(false);

  const evaluateAnswer = () => {
    if (
      question.type === PractiseType.WRITING &&
      answer !== question.task.answer.meaning
    ) {
      setWrong(true);
    } else {
      setCorrectly((prev) => prev + 1);
    }

    setAnswered(true);
    setEvaluate(true);
  };

  return (
    question.type === PractiseType.WRITING && (
      <div className="flex flex-col w-[40rem]">
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-end gap-4"
        >
          <Image
            src="/images/dumpling.png"
            alt="Dumpling"
            width={50}
            height={50}
          />
          <div className="flex items-center px-10 pb-3 pt-3 font-semibold rounded-e-full rounded-tl-full border border-neutral-700 bg-neutral-800 w-fit">
            <div
              className="flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setWordTooltip(true)}
              onMouseLeave={() => setWordTooltip(false)}
            >
              <div className="text-[13px] text-neutral-400 leading-[10px]">
                {question.task.answer.pronunciation}
              </div>
              <div className="zh text-2xl border-b-2 border-dotted border-neutral-400">
                {question.task.answer.value}
              </div>

              <WordTooltip
                open={wordTooltip}
                setOpen={setWordTooltip}
                word={question.task.answer}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col gap-4 mt-24"
        >
          <div className="font-bold text-sm text-neutral-400">
            Type an answer
          </div>
          <div className="flex">
            <div
              className={cn(
                "flex items-center px-10 pb-3 pt-3 font-semibold rounded-s-full border w-full transition-all",
                answer !== null && evaluate
                  ? !wrong
                    ? "border-blue-500 bg-blue-600"
                    : "border-red-600 bg-red-700"
                  : "border-neutral-700 bg-neutral-800"
              )}
            >
              <input
                type="text"
                className="w-full bg-transparent focus:outline-none text-white"
                placeholder="Type your answer here"
                disabled={evaluate}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {answer !== null && evaluate && (
                <>
                  {!wrong ? (
                    <CheckCircle weight="fill" size={24} />
                  ) : (
                    <XCircle weight="fill" size={24} />
                  )}
                </>
              )}
            </div>
            <button
              className="px-8 py-2 rounded-e-full bg-neutral-700 font-semibold"
              onClick={evaluateAnswer}
            >
              Submit
            </button>
          </div>
        </motion.div>
      </div>
    )
  );
}
