import { cn } from "@/utils/cn";
import { LessonType } from "@/utils/lesson.types";
import { CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";

interface Props {
  lesson: LessonType;
  index: number;
}

export default function Lesson({ lesson, index }: Props) {
  return (
    <Link
      href={`/lessons/${index + 1}`}
      className={cn(
        "flex flex-col gap-4 items-center min-w-60 px-6 py-3 border border-b-4 hover:border hover:mt-[3px] transition-all rounded-xl",
        lesson.completed
          ? "bg-neutral-700 border-neutral-600"
          : "bg-neutral-800 border-neutral-700"
      )}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <div className="text-neutral-400 font-bold text-sm">
            Lesson {index + 1}
          </div>
          {lesson.completed && (
            <CheckCircle weight="fill" size={24} className="text-neutral-400" />
          )}
        </div>

        <div>
          <span className="text-xl font-semibold">{lesson.name}</span>{" "}
          <span className="zh">({lesson.translation})</span>
        </div>
      </div>
      {/* <div className="font-bold text-neutral-500">REVISE</div> */}
      {/* <button className="w-full rounded-xl py-2 mt-4 border bg-neutral-100 font-semibold transition-all">
        Completed
      </button> */}
    </Link>
  );
}
