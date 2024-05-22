"use client";

import Layout from "@/components/layouts/Layout";
import { getAvatar } from "@/utils/avatar";
import { fetchSavedWords, fetchXpMe, postSaveWord } from "@/utils/fetchers";
import { WordType } from "@/utils/word.types";
import { XpMeType } from "@/utils/xp.types";
import { Star } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [xpMe, setXpMe] = useState<XpMeType>();
  const [savedWords, setSavedWords] = useState<WordType[]>();

  useEffect(() => {
    fetchXpMe().then((xp) => setXpMe(xp));
    fetchSavedWords().then((words) => setSavedWords(words));
  }, []);

  const removeWord = async (wordId: string) => {
    if (savedWords) {
      const wordsCopy = [...savedWords];
      const index = wordsCopy.findIndex((word) => word.wordId === wordId);
      wordsCopy.splice(index, 1);
      setSavedWords(wordsCopy);
    }

    await postSaveWord(wordId);
  };

  // user id
  const userId = session?.user?.id ?? "2bf03201-9c3c-404e-b479-712176dbd22a";

  return (
    <Layout>
      <div className="flex flex-col gap-16">
        <div className="flex gap-6 items-center">
          <img
            src={getAvatar(userId)}
            alt="Avatar"
            className="h-16 w-16 rounded-full border border-white border-opacity-10"
            width={64}
            height={64}
            style={{ objectFit: "cover" }}
          />
          <h1 className="font-bold text-3xl">
            {session?.user.email ?? "User"}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-bold text-sm text-neutral-400">Experience</div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-3xl">{xpMe?.value ?? 0}</h1>
            <img
              src="/images/dumpling-icon.png"
              alt="Dumpling"
              width={28}
              height={28}
              className="invert opacity-70"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-bold text-sm text-neutral-400">Saved words</div>
          {savedWords && savedWords.length > 0 && (
            <div className="flex flex-row gap-8 flex-wrap">
              {savedWords.map((word) => (
                <div
                  className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-xl px-6 w-60 py-3"
                  key={word.id}
                >
                  <div>
                    <div>
                      <span className="text-xl font-semibold zh">
                        {word.value}
                      </span>{" "}
                      <span>({word.pronunciation})</span>
                    </div>
                    <div className="text-neutral-400 font-semibold">
                      {word.meaning}
                    </div>
                  </div>

                  <button onClick={() => removeWord(word.wordId!)}>
                    <Star className="text-yellow-500 w-6 h-6" weight="fill" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
