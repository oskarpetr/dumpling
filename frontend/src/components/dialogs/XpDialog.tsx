import { cn } from "@/utils/cn";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Subtitle } from "../Titles";
import { XpType } from "@/utils/xp.types";
import { fetchXpList } from "@/utils/fetchers";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function XpDialog({ open, setOpen }: Props) {
  const [xps, setXps] = useState<XpType[]>([]);

  useEffect(() => {
    fetchXpList().then((xps) => setXps(xps));
  }, []);

  return (
    <div
      className={cn(
        "absolute w-96 px-8 py-6 bg-neutral-800 border border-neutral-700 rounded-xl top-20 right-10 transition-all",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <Subtitle title="Ranks" />

      <div className="flex flex-col gap-4">
        {xps.map((xp, index) => (
          <div key={index} className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="text-neutral-400 font-bold w-4">#{index + 1}</div>

              <div className="w-10 h-10 rounded-full bg-neutral-400"></div>
              <div className="font-bold text-sm">{xp.user.username}</div>
            </div>

            <div className="text-neutral-400 font-bold text-sm">
              {xp.value} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
