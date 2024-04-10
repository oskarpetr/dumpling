"use client";

import Layout from "@/components/Layout";
import Lesson from "@/components/Lesson";
import Title from "@/components/Title";
import { LessonType } from "@/utils/Lesson.types";
import { useState } from "react";

export default function HomePage() {
  const lessonsSampleData: LessonType[] = [
    {
      id: "1",
      name: "Pronouns",
      translation: "代词",
      words: [],
    },
    {
      id: "2",
      name: "Verbs",
      translation: "动词",
      words: [],
    },
    {
      id: "3",
      name: "Family",
      translation: "家庭",
      words: [
        { id: "1", value: "mum", meaning: "妈妈", pronunciation: "māmā" },
        { id: "2", value: "dad", meaning: "爸爸", pronunciation: "bàba" },
      ],
    },
  ];

  const [lessons, setLessons] = useState<LessonType[]>(lessonsSampleData);

  return (
    <Layout>
      <Title title="Lessons" />

      <div className="flex flex-row gap-8">
        {lessons.map((lesson, index) => (
          <Lesson key={lesson.id} lesson={lesson} index={index} />
        ))}
      </div>
    </Layout>
  );
}
