"use client";

import { X } from "@phosphor-icons/react";
import Link from "next/link";

interface Props {
  percentage: number;
  currentQuestion: number;
  questionsLength: number;
}

export default function LessonNavBar({
  percentage,
  currentQuestion,
  questionsLength,
}: Props) {
  return (
    <div className="flex justify-between items-center bg-neutral-800 border-b border-neutral-700 px-20 py-4">
      <Link href="/" className="flex flex-1">
        <div className="flex items-center gap-2 hover:bg-neutral-700 transition-all rounded-xl px-4 py-2 text-neutral-400">
          <X weight="bold" className="tex" />
          <p className="font-semibold">Exit lesson</p>
        </div>
      </Link>

      <div className="h-5 rounded-full bg-neutral-700 w-[40rem] self-center">
        <div
          className="h-5 rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: percentage * 720 + "px" }}
        ></div>
      </div>

      <div className="flex flex-1 justify-end">
        <p className="font-semibold text-neutral-400">
          Question{" "}
          {currentQuestion > questionsLength
            ? questionsLength
            : currentQuestion}{" "}
          of {questionsLength}
        </p>
      </div>
    </div>
  );
}
