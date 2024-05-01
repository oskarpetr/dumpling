"use client";

import { fetchLessons, fetchXpMe } from "@/utils/fetchers";
import { LessonType } from "@/utils/lesson.types";
import { XpMeType } from "@/utils/xp.types";
import { CardsThree } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import XpModal from "../modals/XpModal";
import UserModal from "../modals/UserModal";

export default function NavBar() {
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [xpMe, setXpMe] = useState<XpMeType>();

  const [xpModal, setXpModal] = useState(false);
  const [userModal, setUserModal] = useState(false);

  useEffect(() => {
    fetchLessons().then((lessons) => setLessons(lessons));
    fetchXpMe().then((xp) => setXpMe(xp));
  }, []);

  const completed = lessons.filter((lesson) => lesson.practised >= 1).length;

  return (
    <div className="flex justify-between items-center bg-neutral-800 border-b border-neutral-700 px-20 py-4">
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-neutral-700 transition-all rounded-xl px-4 py-2"
        onMouseEnter={() => setUserModal(true)}
        onMouseLeave={() => setUserModal(false)}
      >
        <div className="w-6 h-6 rounded-full bg-neutral-400"></div>
        <div className="font-bold text-sm">Oskar Petr</div>

        <UserModal open={userModal} setOpen={setUserModal} />
      </div>

      <div className="flex gap-12">
        <div className="flex items-center gap-2">
          <CardsThree weight="bold" size={20} className="text-neutral-400" />
          <div className="font-bold text-sm">{completed} lessons done</div>
        </div>

        <div
          className="flex cursor-pointer items-center gap-2 hover:bg-neutral-700 transition-all rounded-xl px-4 py-2"
          onMouseEnter={() => setXpModal(true)}
          onMouseLeave={() => setXpModal(false)}
        >
          {/* <Sparkle weight="bold" size={20} className="text-neutral-400" /> */}
          <img
            src="/images/dumpling-icon.png"
            alt="Dumpling"
            width={20}
            height={20}
            className="invert"
          />
          <button className="font-bold text-sm">{xpMe?.value ?? 0}</button>

          <XpModal open={xpModal} setOpen={setXpModal} xpMe={xpMe} />
        </div>
      </div>
    </div>
  );
}
