"use client";

import { fetchLesson, fetchPractise } from "@/utils/fetchers";
import { LessonContentType } from "@/utils/lesson-content.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import WordTooltip from "@/components/modals/WordTooltip";
import LessonLayout from "@/components/layouts/LessonLayout";
import Options from "@/components/lesson/Options";
import Image from "next/image";
import { Subtitle } from "@/components/Titles";
import {
  LessonPractiseType,
  PractiseType,
} from "@/utils/lesson-practise.types";
import Matching from "@/components/lesson/Matching";

export default function LessonPage() {
  const { lessonId } = useParams();

  // lesson state
  const [answer, setAnswer] = useState<null | string>(null);
  const [question, setQuestion] = useState(0);
  const [correctly, setCorrectly] = useState(0);
  const [wrong, setWrong] = useState(false);

  // tooltip state
  const [wordTooltip, setWordTooltip] = useState(false);

  // lesson content state
  const [loading, setLoading] = useState(true);
  const [lessonContent, setLessonContent] = useState<LessonContentType[]>([]);
  const [practiseContent, setPractiseContent] = useState<LessonPractiseType[]>(
    []
  );
  const [answered, setAnswered] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  // lesson progress percentage
  const progressPercentage = (question / lessonContent?.length) * 100;

  useEffect(() => {
    const fetchLessonContent = async () => {
      const lesson = await fetchLesson(lessonId as string);
      setLessonContent(lesson);

      const practise = await fetchPractise(lessonId as string);
      setPractiseContent(practise);

      setLoading(false);
    };

    fetchLessonContent();
  }, []);

  // continue lesson
  const continueLesson = () => {
    // check answer
    if (answer === lessonContent[question].answer.meaning) {
      setCorrectly((prev) => prev + 1);
    }

    // next question
    setQuestion((prev) => prev + 1);
    setAnswer(null);
  };

  // continue practise
  const continuePractise = () => {
    setQuestion((prev) => prev + 1);
    setAnswered(false);
    setReset(true);
  };

  // practise subheading
  const practiseType = practiseContent[question]?.type ?? PractiseType.MATCHING;

  const practiseSubheading =
    practiseType === PractiseType.MATCHING
      ? "Match the words"
      : practiseType === PractiseType.MULTIPLE_CHOICE
      ? "Select the correct answer"
      : practiseType === PractiseType.WRITING
      ? "Write the word"
      : "Select the correct pronunciation";

  // learning done
  const [learningDone, setLearningDone] = useState(true);

  // learning complete
  const learningComplete = () => {
    setQuestion(0);
    setLearningDone(true);
  };

  return (
    <LessonLayout
      percentage={progressPercentage}
      lesson={{
        name: "",
        bestScore: 0,
        lessonId: "",
        practised: 0,
        translation: "",
        words: [],
      }}
    >
      {lessonContent &&
        !loading &&
        !learningDone &&
        question !== lessonContent.length && (
          <div className="flex justify-center pt-20">
            <div className="flex flex-col w-[40rem]">
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
                      {lessonContent[question].answer.pronunciation}
                    </div>
                    <div className="zh text-2xl border-b-2 border-dotted border-neutral-400">
                      {lessonContent[question].answer.value}
                    </div>

                    <WordTooltip
                      open={wordTooltip}
                      setOpen={setWordTooltip}
                      word={lessonContent[question].answer}
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
                  content={lessonContent[question]}
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
                    onClick={continueLesson}
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
        )}

      {question === lessonContent.length && (
        <div className="flex justify-center items-center">
          <div className="flex flex-col mt-48 gap-12 w-[35rem]">
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col justify-center items-center"
            >
              <div className="flex items-center gap-8">
                <div className="h-32 w-32 relative">
                  <Image
                    src="/images/dumpling.png"
                    alt="Dumpling"
                    objectFit="contain"
                    fill
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 items-center">
                    <div className="font-bold text-3xl">Words reviewed</div>

                    <CheckCircle
                      size={32}
                      weight="fill"
                      className="text-neutral-400"
                    />
                  </div>
                  <div className="text-neutral-400">
                    You have successfully reviewed {lessonContent.length} words
                    in this lesson. Now, you can move on to practising these
                    words in sentences.
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="w-full rounded-xl py-3.5 flex justify-center items-center gap-2 border border-b-4 font-semibold transition-all active:mt-[3px] bg-neutral-800 border-neutral-700 active:border"
              onClick={learningComplete}
            >
              Practise
              <ArrowRight
                weight="bold"
                size={20}
                className="text-neutral-400"
              />
            </motion.button>
          </div>
        </div>
      )}

      {practiseContent &&
        !loading &&
        learningDone &&
        question !== practiseContent.length && (
          <div className="flex justify-center pt-20">
            <div className="flex flex-col w-[40rem]">
              <Subtitle title={practiseSubheading} />

              <motion.div
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex flex-col gap-4 mt-4"
              >
                {practiseType === PractiseType.MATCHING && (
                  <Matching
                    matching={practiseContent[question].options}
                    answered={answered}
                    setAnswered={setAnswered}
                    onReset={reset}
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
        )}
    </LessonLayout>
  );
}
