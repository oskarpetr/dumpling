import axios from "axios";

const API_URL = "http://localhost:3030/api/";

export async function fetchLessons() {
  const response = await axios.get(API_URL + "lessons", {
    headers: {
      Authorization: "b332aee7-c1b5-4454-b489-21f342ff611d",
    },
  });

  return response.data;
}

export async function fetchXpMe() {
  const response = await axios.get(API_URL + "xps/me", {
    headers: {
      Authorization: "b332aee7-c1b5-4454-b489-21f342ff611d",
    },
  });

  return response.data;
}

export async function fetchXpList() {
  const response = await axios.get(API_URL + "xps/list");
  return response.data;
}

export async function fetchLesson(lessonId: string) {
  const response = await axios.get(API_URL + `lessons/${lessonId}`);
  return response.data;
}
