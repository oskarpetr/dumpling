import { cn } from "@/utils/cn";
import { WordType } from "@/utils/word.types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  word: WordType;
}

export default function WordTooltip({ open, setOpen, word }: Props) {
  return (
    <div
      className={cn(
        "absolute px-4 py-2 bg-neutral-700 border border-neutral-600 mt-11 rounded-xl transition-all cursor-auto",
        open
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      )}
    >
      <div>{word.meaning}</div>
    </div>
  );
}
