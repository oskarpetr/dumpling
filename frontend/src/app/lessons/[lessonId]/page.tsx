"use client";

import { fetchLesson, fetchPractise } from "@/utils/fetchers";
import { LessonLearningType } from "@/utils/lesson-content.types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LessonLayout from "@/components/layouts/LessonLayout";
import { LessonPractiseType } from "@/utils/lesson-practise.types";
import PractiseMode from "@/components/practise/PractiseMode";
import WordsReviewed from "@/components/lesson/WordsReviewed";
import LearningMode from "@/components/lesson/LearningMode";
import WordsPractised from "@/components/practise/WordsPractised";
import { useSession } from "next-auth/react";

export default function LessonPage() {
  const { lessonId } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [session]);

  // lesson state
  const [question, setQuestion] = useState(0);
  const [correctly, setCorrectly] = useState(0);

  // lesson content state
  const [loading, setLoading] = useState(true);
  const [lessonContent, setLessonContent] = useState<LessonLearningType[]>([]);
  const [practiseContent, setPractiseContent] = useState<LessonPractiseType[]>(
    []
  );

  // learning done
  const [learningDone, setLearningDone] = useState(false);

  // lesson progress percentage
  const progressPercentage = !learningDone
    ? question / lessonContent?.length
    : question / practiseContent?.length;

  useEffect(() => {
    const fetchLessonContent = async () => {
      const lesson = await fetchLesson(lessonId as string);
      setLessonContent(lesson);

      const practise = await fetchPractise(lessonId as string);
      setPractiseContent(practise);

      setLoading(false);
    };

    if (status === "authenticated") {
      fetchLessonContent();
    }
  }, []);

  // continue lesson
  const continueLesson = () => {
    setQuestion((prev) => prev + 1);
  };

  // learning complete
  const learningComplete = () => {
    setQuestion(0);
    setLearningDone(true);
  };

  return (
    status === "authenticated" && (
      <LessonLayout
        percentage={progressPercentage}
        currentQuestion={question + 1}
        questionsLength={
          !learningDone ? lessonContent.length : practiseContent.length
        }
      >
        {lessonContent &&
          !loading &&
          !learningDone &&
          question !== lessonContent.length && (
            <LearningMode
              question={lessonContent[question]}
              continueLesson={continueLesson}
            />
          )}

        {question === lessonContent.length && !learningDone && (
          <WordsReviewed
            wordsCount={lessonContent.length}
            learningComplete={learningComplete}
          />
        )}

        {practiseContent &&
          !loading &&
          learningDone &&
          question !== practiseContent.length && (
            <PractiseMode
              question={practiseContent[question]}
              setQuestion={setQuestion}
              setCorrectly={setCorrectly}
            />
          )}

        {question === practiseContent.length && learningDone && (
          <WordsPractised lessonId={lessonId as string} xp={correctly * 20} />
        )}
      </LessonLayout>
    )
  );
}
