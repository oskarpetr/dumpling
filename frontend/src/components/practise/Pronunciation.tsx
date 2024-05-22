import Image from "next/image";
import { motion } from "framer-motion";
import WordTooltip from "../modals/WordTooltip";
import Options from "../lesson/Options";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  LessonPractiseType,
  PractiseType,
} from "@/utils/lesson-practise.types";
import DumplingMessage from "../lesson/DumplingMessage";

interface Props {
  question: LessonPractiseType;
  setAnswered: Dispatch<SetStateAction<boolean>>;
  setCorrectly: Dispatch<SetStateAction<number>>;
}

export default function Pronunciation({
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
        question.type === PractiseType.PRONUNCIATION &&
        answer == question.task.answer.pronunciation
      ) {
        setCorrectly((prev) => prev + 1);
      }
    }
  }, [answer]);

  return (
    question.type === PractiseType.PRONUNCIATION && (
      <div className="flex flex-col w-[40rem]">
        <DumplingMessage word={question.task.answer} pronunciation={false} />

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
