"use client";

import { LessonType } from "@/utils/lesson.types";

interface Props {
  percentage: number;
  lesson: LessonType;
}

export default function LessonNavBar({ percentage, lesson }: Props) {
  return (
    <div className="flex justify-center items-center bg-neutral-800 border-b border-neutral-700 px-20 py-4">
      <div className="h-4 rounded-full bg-neutral-700 w-[40rem]">
        <div
          className="h-4 rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: percentage + "%" }}
        ></div>
      </div>
    </div>
  );
}
