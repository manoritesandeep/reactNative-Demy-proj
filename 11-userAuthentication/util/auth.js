import axios from "axios";

const API_KEY = "AIzaSyAU7Mgjxq-CXvIFb4vGYeBM6XjoCe2pKu0";
// const API_KEY = process.env.FIREBASE_API_KEY;
// console.log("API KEY: ", API_KEY);

async function authenticate(email, password, mode) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  console.log("Login flow check: ", response.data);
}

export async function createUser(email, password) {
  await authenticate(email, password, "signUp");
}

// //  login
export async function login(email, password) {
  await authenticate(email, password, "signInWithPassword");
}

// //  Old method...
// export async function createUser(email, password) {
//   const response = await axios.post(
//     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
//     {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//     }
//   );
// }
