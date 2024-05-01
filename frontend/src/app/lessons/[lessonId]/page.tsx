"use client";

import { fetchLesson } from "@/utils/fetchers";
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
import { Subtitle, Title } from "@/components/Titles";

export default function LessonPage() {
  const { lessonId } = useParams();

  // lesson state
  const [answer, setAnswer] = useState<null | string>(null);
  const [question, setQuestion] = useState(0);
  const [correctly, setCorrectly] = useState(0);

  // tooltip state
  const [wordTooltip, setWordTooltip] = useState(false);

  // lesson content state
  const [loading, setLoading] = useState(true);
  const [lessonContent, setLessonContent] = useState<LessonContentType[]>([]);

  // lesson progress percentage
  const progressPercentage = (question / lessonContent?.length) * 100;

  useEffect(() => {
    fetchLesson(lessonId as string).then((lesson) => {
      setLessonContent(lesson);
      setLoading(false);
    });
  }, []);

  // continue lesson
  const continueLesson = () => {
    // check answer
    if (answer === lessonContent[question].word.meaning) {
      setCorrectly((prev) => prev + 1);
    }

    // next question
    setQuestion((prev) => prev + 1);
    setAnswer(null);
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
      {lessonContent && !loading && question !== lessonContent.length && (
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
                    {lessonContent[question].word.pronunciation}
                  </div>
                  <div className="zh text-2xl border-b border-dotted border-neutral-500">
                    {lessonContent[question].word.value}
                  </div>

                  <WordTooltip
                    open={wordTooltip}
                    setOpen={setWordTooltip}
                    word={lessonContent[question].word}
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
                options={lessonContent[question].options}
                answer={answer}
                setAnswer={setAnswer}
              />

              <div
                className={cn(
                  "mt-8 transition-all duration-500",
                  answer ? "opacity-100" : "opacity-0"
                )}
              >
                <button
                  className="w-full rounded-xl py-3.5 flex justify-center items-center gap-2 border border-b-4 bg-neutral-800 font-semibold transition-all enabled:active:mt-[3px] enabled:bg-neutral-800 enabled:border-neutral-700 enabled:active:border disabled:text-neutral-400 disabled:border-neutral-700"
                  disabled={answer == null}
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
    </LessonLayout>
  );
}
