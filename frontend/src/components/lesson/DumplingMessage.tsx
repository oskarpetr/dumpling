import Image from "next/image";
import WordTooltip from "../modals/WordTooltip";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WordType } from "@/utils/word.types";
import { Star } from "@phosphor-icons/react";
import { postIsWordSaved, postSaveWord } from "@/utils/fetchers";
import { cn } from "@/utils/cn";

interface Props {
  word: WordType;
  pronunciation?: boolean;
}

export default function DumplingMessage({ word, pronunciation = true }: Props) {
  const [wordTooltip, setWordTooltip] = useState(false);
  const [wordSaved, setWordSaved] = useState(false);

  useEffect(() => {
    const postIsSaved = async () => {
      const isSaved = await postIsWordSaved(word.wordId!);
      setWordSaved(isSaved);
    };

    postIsSaved();
  }, [word.wordId]);

  const saveWord = async (wordId: string) => {
    await postSaveWord(wordId);
    setWordSaved((prev) => !prev);
  };

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex items-end gap-4"
    >
      <Image src="/images/dumpling.png" alt="Dumpling" width={50} height={50} />
      <div className="flex items-center gap-4">
        <div className="flex items-center px-10 pb-3 pt-3 font-semibold rounded-e-full rounded-tl-full border border-neutral-700 bg-neutral-800 w-fit">
          <div
            className="flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setWordTooltip(true)}
            onMouseLeave={() => setWordTooltip(false)}
          >
            <div className="text-[13px] text-neutral-400 leading-[10px]">
              {pronunciation ? word.pronunciation : "???"}
            </div>
            <div className="zh text-2xl border-b-2 border-dotted border-neutral-400">
              {word.value}
            </div>

            <WordTooltip
              open={wordTooltip}
              setOpen={setWordTooltip}
              word={word}
            />
          </div>
        </div>

        <button onClick={() => saveWord(word.wordId!)}>
          <Star
            className={cn(
              "h-6 w-6 text-yellow-500 transition-all",
              wordSaved ? "opcaity-100" : "opacity-50"
            )}
            weight={wordSaved ? "fill" : "regular"}
          />
        </button>
      </div>
    </motion.div>
  );
}
