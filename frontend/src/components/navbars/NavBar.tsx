"use client";

import { fetchLessons, fetchXpMe } from "@/utils/fetchers";
import { LessonType } from "@/utils/lesson.types";
import { XpMeType } from "@/utils/xp.types";
import { CardsThree, SignOut } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import XpModal from "../modals/XpModal";
import Link from "next/link";
import { getAvatar } from "@/utils/avatar";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [xpMe, setXpMe] = useState<XpMeType>();

  const [xpModal, setXpModal] = useState(false);
  const [userModal, setUserModal] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    fetchLessons().then((lessons) => setLessons(lessons));
    fetchXpMe().then((xp) => setXpMe(xp));
  }, []);

  const completed = lessons.filter((lesson) => lesson.practised >= 1).length;

  // user id
  const userId = session?.user?.id ?? "2bf03201-9c3c-404e-b479-712176dbd22a";

  return (
    <div className="flex justify-between items-center bg-neutral-800 border-b border-neutral-700 px-20 py-4">
      <div className="flex gap-4 items-center">
        <Link
          href="/profile"
          className="flex items-center gap-2 cursor-pointer hover:bg-neutral-700 transition-all rounded-xl px-4 py-2"
          onMouseEnter={() => setUserModal(true)}
          onMouseLeave={() => setUserModal(false)}
        >
          <img
            src={getAvatar(userId)}
            alt="Avatar"
            className="h-6 w-6 rounded-full border border-white border-opacity-10"
            width={24}
            height={24}
            style={{ objectFit: "cover" }}
          />
          <div className="font-bold text-sm">
            {session?.user.email ?? "User"}
          </div>
        </Link>

        <button
          onClick={() => signOut()}
          className="hover:bg-neutral-700 transition-all rounded-xl px-4 py-2 font-bold text-sm flex gap-2"
        >
          <SignOut weight="bold" size={20} className="text-neutral-400" />
          Log out
        </button>
      </div>

      <div className="flex gap-12">
        <Link
          href={"/"}
          className="flex items-center gap-2 hover:bg-neutral-700 transition-all rounded-xl px-4 py-2"
        >
          <CardsThree weight="bold" size={20} className="text-neutral-400" />
          <div className="font-bold text-sm">
            {completed} {completed === 1 ? "lesson" : "lessons"} done
          </div>
        </Link>

        <div
          className="flex cursor-pointer items-center gap-2 hover:bg-neutral-700 transition-all rounded-xl px-4 py-2"
          onMouseEnter={() => setXpModal(true)}
          onMouseLeave={() => setXpModal(false)}
        >
          <img
            src="/images/dumpling-icon.png"
            alt="Dumpling"
            width={20}
            height={20}
            className="invert opacity-70"
          />
          <button className="font-bold text-sm">{xpMe?.value ?? 0}</button>

          <XpModal open={xpModal} setOpen={setXpModal} xpMe={xpMe} />
        </div>
      </div>
    </div>
  );
}
