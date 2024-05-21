import Image from "next/image";
import { motion } from "framer-motion";
import WordTooltip from "../modals/WordTooltip";
import Options from "../lesson/Options";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  LessonPractiseType,
  PractiseType,
} from "@/utils/lesson-practise.types";

interface Props {
  question: LessonPractiseType;
  setAnswered: Dispatch<SetStateAction<boolean>>;
  setCorrectly: Dispatch<SetStateAction<number>>;
}

export default function MultipleChoice({
  question,
  setAnswered,
  setCorrectly,
}: Props) {
  // tooltip state
  const [wordTooltip, setWordTooltip] = useState(false);

  // unused state
  const [wrong, setWrong] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (answer !== null) {
      setAnswered(true);

      if (
        question.type === PractiseType.MULTIPLE_CHOICE &&
        answer == question.task.answer.meaning
      ) {
        setCorrectly((prev) => prev + 1);
      }
    }
  }, [answer]);

  return (
    question.type === PractiseType.MULTIPLE_CHOICE && (
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
            Select an answer
          </div>
          <Options
            content={question.task}
            setWrong={setWrong}
            answer={answer}
            setAnswer={setAnswer}
            disabled={answer !== null}
          />
        </motion.div>
      </div>
    )
  );
}
