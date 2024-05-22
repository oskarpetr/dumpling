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

// create account
export async function postAccount(username: string, password: string) {
  const response = await axios.post(API_URL + "accounts", {
    username,
    password,
  });
  return response.data;
}

// sign in
export async function signIn(username: string) {
  const devUrl = "http://localhost:3030/api/sign-in";
  const prodUrl = "https://dumpling.oskarpetr.dev/api/sign-in";

  // const response = await fetch(
  //   process.env.NODE_ENV === "development" ? devUrl : prodUrl,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username }),
  //   }
  // );
  const response = await axios.post(
    process.env.NODE_ENV === "development" ? devUrl : prodUrl,
    { username }
  );
  return response.data;
}

// completed lesson
export async function postCompleteLesson(lessonId: string, xp: number) {
  const response = await axios.post(API_URL + `complete/${lessonId}`, {
    xp,
  });
  return response.data;
}

// saved words
export async function fetchSavedWords() {
  const response = await axios.get(API_URL + "saved-words");
  return response.data;
}

// save word
export async function postSaveWord(wordId: string) {
  const response = await axios.post(API_URL + "save-word", { id: wordId });
  return response.data;
}

// is word saved
export async function postIsWordSaved(wordId: string) {
  const response = await axios.post(API_URL + "is-word-saved", { id: wordId });
  return response.data;
}
