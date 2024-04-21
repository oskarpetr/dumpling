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
