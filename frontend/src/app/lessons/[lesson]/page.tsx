"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function LessonPage() {
  const { lesson } = useParams();

  const [answer, setAnswer] = useState<null | number>(null);

  const answers = [
    "dad and mom",
    "siblings",
    "grandparents",
    "aunts and uncles",
  ];

  return (
    <div className="flex justify-center pt-20">
      <div className="flex flex-col gap-12 w-[40rem]">
        <div className="pb-4 border-b border-neutral-800">
          <div>Translate this phrase.</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-bold text-sm">DUMPLING</div>
          <div className="zh text-xl px-8 py-3 font-semibold rounded-full border border-neutral-700 bg-neutral-800 w-fit">
            妈妈和爸爸
          </div>
        </div>

        <div className="flex flex-col gap-12 mt-12">
          <div className="grid grid-cols-2 gap-4">
            {answers.map((item, index) => (
              <button
                key={item}
                onClick={() => setAnswer(index)}
                className={`${
                  answer === index
                    ? "border-blue-500 bg-blue-600"
                    : "border-neutral-700 bg-neutral-800"
                } w-full border border-b-4 py-4 rounded-xl transition-all active:border active:mt-[3px]`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <button
              className="w-full rounded-xl py-4 border border-b-4 bg-neutral-800 font-semibold transition-all enabled:active:mt-[3px] enabled:bg-blue-600 enabled:border-blue-500 enabled:active:border disabled:text-neutral-400 disabled:border-neutral-700"
              disabled={answer == null}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
