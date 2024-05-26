"use client";

import Lesson from "@/components/lesson/Lesson";
import { Title } from "@/components/Titles";
import Layout from "@/components/layouts/Layout";
import LessonSkeleton from "@/components/skeletons/LessonSkeleton";
import { fetchLessons } from "@/utils/fetchers";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UnitType } from "@/utils/unit.types";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchLessonsEffect = async () => {
    if (status === "authenticated") {
      fetchLessons().then((data) => {
        setUnits(data!);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [session]);

  useEffect(() => {
    fetchLessonsEffect();
  }, [status]);

  useEffect(() => {
    fetchLessonsEffect();
  }, []);

  const [units, setUnits] = useState<UnitType[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    status === "authenticated" && (
      <Layout>
        <Title title="Lessons" />

        <div className="flex flex-col gap-8">
          {units.map((unit, index) => (
            <div key={unit.name} className="flex flex-col gap-2">
              <p className="font-bold text-sm text-neutral-400">{unit.name}</p>
              <div className="flex flex-row gap-8 flex-wrap">
                {unit.lessons.map((lesson, index) => (
                  <Lesson key={lesson.lessonId} lesson={lesson} index={index} />
                ))}
              </div>
            </div>
          ))}

          {loading &&
            [...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="bg-neutral-800 border border-neutral-700 w-20 rounded-lg h-[22.5px]"></div>
                <div className="flex flex-row gap-8 flex-wrap">
                  {[...Array(3)].map((_, index) => (
                    <LessonSkeleton key={index} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </Layout>
    )
  );
}
