import { cn } from "@/utils/cn";
import { LessonType } from "@/utils/lesson.types";
import { CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";

interface Props {
  lesson: LessonType;
  index: number;
}

export default function Lesson({ lesson, index }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className={cn(
          "flex flex-col gap-1 min-w-60 px-6 py-3 border border-b-4 hover:border hover:mt-[3px] transition-all rounded-xl",
          lesson.completed
            ? "bg-neutral-700 border-neutral-600"
            : "bg-neutral-800 border-neutral-700"
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex w-full justify-between items-center">
          <div>
            <span className="text-xl font-semibold">{lesson.name}</span>{" "}
            <span className="zh">({lesson.translation})</span>
          </div>
          {lesson.completed && (
            <CheckCircle weight="fill" size={24} className="text-neutral-400" />
          )}
        </div>

        <div className="text-neutral-400 font-bold text-sm">
          {lesson.words.length} new words
        </div>
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
        <table className="w-full">
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
        </table>
      </Modal>
    </>
  );
}
