import { cn } from "@/utils/cn";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Subtitle } from "../Titles";
import { XpMeType, XpType } from "@/utils/xp.types";
import { fetchXpList } from "@/utils/fetchers";
import { ArrowDown } from "@phosphor-icons/react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  xpMe?: XpMeType;
}

export default function XpModal({ open, setOpen, xpMe }: Props) {
  const [xps, setXps] = useState<XpType[]>([]);

  useEffect(() => {
    fetchXpList().then((xps) => setXps(xps));
  }, []);

  const userId = "b332aee7-c1b5-4454-b489-21f342ff611d";

  return (
    <div
      className={cn(
        "absolute w-96 px-8 py-6 bg-neutral-800 border border-neutral-700 rounded-xl top-20 right-10 transition-all cursor-auto",
        open
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      <Subtitle title="Top 5 ranks" />

      <div className="flex flex-col gap-4">
        {xps.map((xp, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-4 items-center justify-between border-b border-neutral-700 pb-4",
              index === xps.length - 1
                ? "border-none"
                : "border-b border-neutral-700 pb-4"
            )}
          >
            <div className="flex gap-6 items-center">
              <div className="text-neutral-500 font-bold w-4">#{index + 1}</div>

              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full bg-neutral-400"></div>
                <div className="font-bold text-sm">{xp.user.username}</div>
              </div>
            </div>

            <div className="text-neutral-300 font-bold text-sm">
              {xp.value} XP
            </div>
          </div>
        ))}

        {!xps.find((xp) => xp.userId === userId) && (
          <>
            <div className="flex justify-center items-center gap-1">
              <ArrowDown size={20} className="text-neutral-400" />
              <div className="font-bold text-sm text-neutral-400">
                Your place
              </div>
            </div>

            <div className="flex gap-4 items-center justify-between">
              <div className="flex gap-6 items-center">
                <div className="text-neutral-500 font-bold w-4">
                  #{xpMe?.rank ?? 0}
                </div>

                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-neutral-400"></div>
                  <div className="font-bold text-sm">You</div>
                </div>
              </div>

              <div className="text-neutral-300 font-bold text-sm">
                {xpMe?.value ?? 0} XP
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
