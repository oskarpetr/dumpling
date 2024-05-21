import {
  LessonPractiseType,
  PractiseType,
} from "@/utils/lesson-practise.types";
import { Subtitle } from "../Titles";
import { motion } from "framer-motion";
import Matching from "./Matching";
import { cn } from "@/utils/cn";
import { ArrowRight, Barbell } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useState } from "react";
import MultipleChoice from "./MultipleChoice";
import Pronunciation from "./Pronunciation";
import Writing from "./Writing";

interface Props {
  question: LessonPractiseType;
  setQuestion: Dispatch<SetStateAction<number>>;
  setCorrectly: Dispatch<SetStateAction<number>>;
}

export default function PractiseMode({
  question,
  setQuestion,
  setCorrectly,
}: Props) {
  const [answered, setAnswered] = useState(false);

  // practise subheading
  const practiseSubheading =
    question?.type === PractiseType.MATCHING
      ? "Match words"
      : question?.type === PractiseType.MULTIPLE_CHOICE
      ? "Select answer"
      : question?.type === PractiseType.WRITING
      ? "Translate this word"
      : "Select pronunciation";

  // continue practise
  const continuePractise = () => {
    setQuestion((prev) => prev + 1);
    setAnswered(false);
  };

  return (
    <div className="flex justify-center pt-20">
      <div className="flex flex-col w-[40rem]">
        <div className="font-bold text-sm text-neutral-500 mb-2 flex gap-2 items-center">
          <Barbell weight="bold" />
          Practise mode
        </div>
        <Subtitle title={practiseSubheading} />

        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col gap-4 mt-4"
        >
          {question.type === PractiseType.MATCHING && (
            <Matching
              question={question.task}
              answered={answered}
              setAnswered={setAnswered}
              setCorrectly={setCorrectly}
            />
          )}

          {question.type === PractiseType.MULTIPLE_CHOICE && (
            <MultipleChoice
              question={question}
              setAnswered={setAnswered}
              setCorrectly={setCorrectly}
            />
          )}

          {question.type === PractiseType.PRONUNCIATION && (
            <Pronunciation
              question={question}
              setAnswered={setAnswered}
              setCorrectly={setCorrectly}
            />
          )}

          {question.type === PractiseType.WRITING && (
            <Writing
              question={question}
              setAnswered={setAnswered}
              setCorrectly={setCorrectly}
            />
          )}

          <div
            className={cn(
              "mt-8 transition-all duration-500",
              answered ? "opacity-100" : "opacity-0"
            )}
          >
            <button
              className="w-full rounded-xl py-3.5 flex justify-center items-center gap-2 border border-b-4 bg-neutral-800 font-semibold transition-all enabled:active:mt-[3px] enabled:bg-neutral-800 enabled:border-neutral-700 enabled:active:border disabled:text-neutral-400 disabled:border-neutral-700"
              disabled={!answered}
              onClick={continuePractise}
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
