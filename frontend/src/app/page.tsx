"use client";

import Layout from "@/components/Layout";
import Lesson from "@/components/Lesson";
import { Title } from "@/components/Titles";
import LessonSkeleton from "@/components/skeletons/LessonSkeleton";
import { cn } from "@/utils/cn";
import { fetchLessons } from "@/utils/fetchers";
import { LessonType } from "@/utils/lesson.types";
import { useEffect, useState } from "react";

export default function HomePage() {
  // const lessonsQuery = useQuery({
  //   queryKey: ["lessons"],
  //   queryFn: fetchLessons,
  // });

  useEffect(() => {
    fetchLessons().then((lessons) => {
      setLessons(lessons);
      setLoading(false);
    });
  }, []);

  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [loading, setLoading] = useState(true);

  return (
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
  );
}
