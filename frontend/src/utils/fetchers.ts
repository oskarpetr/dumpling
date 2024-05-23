import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = "http://localhost:3030/api/";

// fetch lessons
export async function fetchLessons() {
  const session = await getSession();

  const response = await axios.get(API_URL + "lessons", {
    headers: { Authorization: session?.user.id },
  });

  return response.data;
}

// fetch xp me
export async function fetchXpMe() {
  const session = await getSession();

  const response = await axios.get(API_URL + "xps/me", {
    headers: { Authorization: session?.user.id },
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

// create account
export async function postAccount(username: string, password: string) {
  const response = await axios.post(API_URL + "accounts", {
    username,
    password,
  });
  return response.data;
}

// sign in
export async function postSignIn(username: string) {
  const devUrl = "http://localhost:3030/api/sign-in";
  const prodUrl = "https://dumpling.oskarpetr.dev/api/sign-in";

  const response = await axios.post(
    process.env.NODE_ENV === "development" ? devUrl : prodUrl,
    { username }
  );
  return response;
}

// completed lesson
export async function postCompleteLesson(lessonId: string, xp: number) {
  const session = await getSession();

  const response = await axios.post(
    API_URL + `complete/${lessonId}`,
    { xp },
    { headers: { Authorization: session?.user.id } }
  );
  return response.data;
}

// saved words
export async function fetchSavedWords() {
  const session = await getSession();

  const response = await axios.get(API_URL + "saved-words", {
    headers: { Authorization: session?.user.id },
  });
  return response.data;
}

// save word
export async function postSaveWord(wordId: string) {
  const session = await getSession();

  const response = await axios.post(
    API_URL + "save-word",
    { id: wordId },
    { headers: { Authorization: session?.user.id } }
  );
  return response.data;
}

// is word saved
export async function postIsWordSaved(wordId: string) {
  const session = await getSession();

  const response = await axios.post(
    API_URL + "is-word-saved",
    { id: wordId },
    { headers: { Authorization: session?.user.id } }
  );
  return response.data;
}
