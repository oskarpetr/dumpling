"use client";

import { fetchLessons, fetchXpMe } from "@/utils/fetchers";
import { LessonType } from "@/utils/lesson.types";
import { XpMeType } from "@/utils/xp.types";
import { CardsThree, Sparkle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import XpDialog from "./dialogs/XpDialog";

export default function NavBar() {
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [xpMe, setXpMe] = useState<XpMeType>();
  const [completed, setCompleted] = useState<number>(0);
  const [xpDialog, setXpDialog] = useState(false);

  useEffect(() => {
    fetchLessons().then((lessons) => setLessons(lessons));
    fetchXpMe().then((xp) => setXpMe(xp));
  }, []);

  useEffect(() => {
    setCompleted(lessons.filter((lesson) => lesson.practised >= 1).length);
  }, [lessons]);

  return (
    <div className="flex justify-between items-center bg-neutral-800 border-b border-neutral-700 px-20 py-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-neutral-400"></div>
        <div className="font-bold text-sm">Oskar Petr</div>
      </div>

      <div className="flex gap-12">
        <div className="flex items-center gap-2">
          <CardsThree weight="bold" size={20} className="text-neutral-400" />
          <div className="font-bold text-sm">{completed} lessons done</div>
        </div>

        <div
          className="flex items-center gap-2"
          onMouseEnter={() => setXpDialog(true)}
          onMouseLeave={() => setXpDialog(false)}
        >
          <Sparkle weight="bold" size={20} className="text-neutral-400" />
          <button className="font-bold text-sm">{xpMe?.value ?? 0} XP</button>
          <XpDialog open={xpDialog} setOpen={setXpDialog} />
        </div>
      </div>
    </div>
  );
}
