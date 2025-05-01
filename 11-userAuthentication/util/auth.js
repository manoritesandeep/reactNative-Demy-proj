import axios from "axios";

const API_KEY = "AIzaSyAU7Mgjxq-CXvIFb4vGYeBM6XjoCe2pKu0";
// const API_KEY = process.env.FIREBASE_API_KEY;
// console.log("API KEY: ", API_KEY);

export async function createUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
}
