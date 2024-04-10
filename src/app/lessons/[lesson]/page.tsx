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
        <div className="pb-4 border-b border-neutral-200">
          <div>Translate this phrase.</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-bold text-sm">DUMPLING</div>
          <div className="zh text-xl px-8 py-3 font-semibold rounded-full border border-neutral-200 bg-neutral-50 w-fit">
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
                    ? "border-blue-300 bg-blue-100"
                    : "border-neutral-200 bg-neutral-50"
                } w-full border border-b-4 py-4 rounded-xl transition-all active:border active:mt-[3px]`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* <button className="bg-blue-300 w-full rounded-xl py-4 border-[0.5px border-b-4 border-blue-500 text-white font-semibold">
            Continue
          </button> */}
        </div>
      </div>
    </div>
  );
}
