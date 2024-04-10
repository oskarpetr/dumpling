import { LessonType } from "@/utils/lesson.types";
import Link from "next/link";

interface Props {
  lesson: LessonType;
  index: number;
}

export default function Lesson({ lesson, index }: Props) {
  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className="px-6 py-3 border border-b-4 hover:border hover:mt-[3px] transition-all bg-neutral-50 rounded-xl w-60"
    >
      <div className="flex flex-col gap-2">
        <div className="font-bold text-sm">Lesson {index + 1}</div>
        <div className="text-xl">
          {lesson.name} <span className="zh">({lesson.translation})</span>
        </div>
      </div>
    </Link>
  );
}
