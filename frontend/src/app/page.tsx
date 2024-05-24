"use client";

import Lesson from "@/components/lesson/Lesson";
import { Title } from "@/components/Titles";
import Layout from "@/components/layouts/Layout";
import LessonSkeleton from "@/components/skeletons/LessonSkeleton";
import { fetchLessons } from "@/utils/fetchers";
import { LessonType } from "@/utils/lesson.types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchLessonsEffect = async () => {
    if (status === "authenticated") {
      fetchLessons().then((data) => {
        setLessons(data!);
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

  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    status === "authenticated" && (
      <Layout>
        <Title title="Lessons" />

        <div className="flex flex-row gap-8 flex-wrap">
          {lessons.map((lesson, index) => (
            <Lesson key={lesson.lessonId} lesson={lesson} index={index} />
          ))}

          {loading &&
            [...Array(3)].map((_, index) => <LessonSkeleton key={index} />)}
        </div>
      </Layout>
    )
  );
}
