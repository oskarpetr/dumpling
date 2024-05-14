import axios from "axios";

const API_URL = "http://localhost:3030/api/";

// fetch lessons
export async function fetchLessons() {
  const response = await axios.get(API_URL + "lessons", {
    headers: {
      Authorization: "b332aee7-c1b5-4454-b489-21f342ff611d",
    },
  });

  return response.data;
}

// fetch xp me
export async function fetchXpMe() {
  const response = await axios.get(API_URL + "xps/me", {
    headers: {
      Authorization: "b332aee7-c1b5-4454-b489-21f342ff611d",
    },
  });

  return response.data;
}

// fetch xp list
export async function fetchXpList() {
  const response = await axios.get(API_URL + "xps/list");
  return response.data;
}

// fetch lesson
export async function fetchLesson(lessonId: string) {
  const response = await axios.get(API_URL + `lessons/${lessonId}`);
  return response.data;
}

// fetch practise
export async function fetchPractise(lessonId: string) {
  const response = await axios.get(API_URL + `practise/${lessonId}`);
  return response.data;
}
