"use client";

import Layout from "@/components/Layout";
import Lesson from "@/components/Lesson";
import Title from "@/components/Title";
import { fetchLessons } from "@/utils/fetchers";
import { LessonType } from "@/utils/lesson.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function HomePage() {
  const lessonsQuery = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });

  const [lessons, setLessons] = useState<LessonType[]>(lessonsQuery.data ?? []);

  return (
    <Layout>
      <Title title="Lessons" />

      <div className="flex flex-row gap-8 flex-wrap">
        {lessons.map((lesson, index) => (
          <Lesson key={lesson.lessonId} lesson={lesson} index={index} />
        ))}
      </div>
    </Layout>
  );
}
