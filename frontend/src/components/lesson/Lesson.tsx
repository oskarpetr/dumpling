import { cn } from "@/utils/cn";
import { LessonType } from "@/utils/lesson.types";
import {
  CheckCircle,
  PersonSimpleRun,
  Play,
  Spinner,
  Star,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";

interface Props {
  lesson: LessonType;
  index: number;
}

export default function Lesson({ lesson, index }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  return (
    <>
      <button
        className={cn(
          "flex flex-row items-center justify-between gap-6 min-w-72 px-6 py-4 border border-b-4 hover:border hover:mt-[3px] transition-all rounded-xl",
          lesson.practised >= 1
            ? "bg-neutral-700 border-neutral-600"
            : "bg-neutral-800 border-neutral-700"
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-col items-start">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xl font-semibold">{lesson.name}</span>{" "}
              <span className="zh">({lesson.translation})</span>
            </div>
          </div>

          <div className="text-neutral-400 font-bold text-sm">
            {lesson.words.length} Words
          </div>
        </div>

        {lesson.practised >= 1 && (
          <CheckCircle size={32} weight="fill" className="text-neutral-300" />
        )}
      </button>

      <Modal
        title={
          <>
            {lesson.name}{" "}
            <span className="zh text-xl">({lesson.translation})</span>
          </>
        }
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      >
        <div className="flex gap-8">
          <div className="flex flex-col gap-1 bg-neutral-700 border border-neutral-600 px-6 py-4 rounded-xl w-full">
            <div className="text-neutral-400 font-bold text-sm">Best score</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  className="text-neutral-300"
                  weight={index + 1 <= lesson.bestScore ? "fill" : "regular"}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full border border-neutral-600 bg-neutral-700 px-6 py-4 rounded-xl">
            <div className="text-neutral-400 font-bold text-sm">
              Times practised
            </div>
            <div className="font-bold">{lesson.practised} Times</div>
          </div>
        </div>

        <Link
          href={`/lessons/${lesson.lessonId}`}
          className="w-full py-2 rounded-xl bg-blue-600 flex gap-2 items-center justify-center border-blue-500 border border-b-4 active:border active:mt-[3px] transition-all"
          onClick={() => setLoadingPage(true)}
        >
          <span className="font-bold">Start lesson</span>
          {loadingPage ? (
            <Spinner size={20} className="animate-spin" />
          ) : (
            <Play weight="fill" size={14} />
          )}
        </Link>

        {/* <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-neutral-500">Vocabulary</th>
              <th className="text-left text-neutral-500">Meaning</th>
              <th className="text-left text-neutral-500">Pronunciation</th>
            </tr>
          </thead>

          <tbody>
            {lesson.words.map((word, index) => (
              <tr
                key={word.id}
                className={cn(
                  "border-neutral-700",
                  index === 0 ? "border-none" : "border-t-2"
                )}
              >
                <td className="text-xl zh py-3">{word.value}</td>
                <td className="py-3">{word.meaning}</td>
                <td className="py-3">{word.pronunciation}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </Modal>
    </>
  );
}
