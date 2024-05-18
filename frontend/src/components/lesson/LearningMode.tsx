import Image from "next/image";
import { Subtitle } from "../Titles";
import { motion } from "framer-motion";
import { useState } from "react";
import { LessonLearningType } from "@/utils/lesson-content.types";
import WordTooltip from "../modals/WordTooltip";
import Options from "./Options";
import { cn } from "@/utils/cn";
import { ArrowRight, Barbell } from "@phosphor-icons/react";

interface Props {
  question: LessonLearningType;
  continueLesson: () => void;
}

export default function LearningMode({ question, continueLesson }: Props) {
  // tooltip state
  const [wordTooltip, setWordTooltip] = useState(false);

  const [answer, setAnswer] = useState<null | string>(null);
  const [wrong, setWrong] = useState(false);

  return (
    <div className="flex justify-center pt-20">
      <div className="flex flex-col w-[40rem]">
        <div className="font-bold text-sm text-neutral-500 mb-2 flex gap-2 items-center">
          <Barbell weight="bold" />
          Learning mode
        </div>
        <Subtitle title="Learn this word" />

        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-end gap-4 mt-4"
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
                {question.answer.pronunciation}
              </div>
              <div className="zh text-2xl border-b-2 border-dotted border-neutral-400">
                {question.answer.value}
              </div>

              <WordTooltip
                open={wordTooltip}
                setOpen={setWordTooltip}
                word={question.answer}
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
            content={question}
            setWrong={setWrong}
            answer={answer}
            setAnswer={setAnswer}
          />

          <div
            className={cn(
              "mt-8 transition-all duration-500",
              answer && !wrong ? "opacity-100" : "opacity-0"
            )}
          >
            <button
              className="w-full rounded-xl py-3.5 flex justify-center items-center gap-2 border border-b-4 bg-neutral-800 font-semibold transition-all enabled:active:mt-[3px] enabled:bg-neutral-800 enabled:border-neutral-700 enabled:active:border disabled:text-neutral-400 disabled:border-neutral-700"
              disabled={answer == null || wrong}
              onClick={() => {
                continueLesson();
                setAnswer(null);
              }}
            >
              Continue
              <ArrowRight
                weight="bold"
                size={20}
                className="text-neutral-400"
              />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
