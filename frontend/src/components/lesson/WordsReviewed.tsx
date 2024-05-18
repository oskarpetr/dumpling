import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  wordsCount: number;
  learningComplete: () => void;
}

export default function WordsReviewed({ wordsCount, learningComplete }: Props) {
  return (
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
                You have successfully reviewed {wordsCount} words in this
                lesson. Now, you can move on to practising these words.
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
          <ArrowRight weight="bold" size={20} className="text-neutral-400" />
        </motion.button>
      </div>
    </div>
  );
}
