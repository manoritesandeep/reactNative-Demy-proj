import axios from "axios";

const API_KEY = "AIzaSyAU7Mgjxq-CXvIFb4vGYeBM6XjoCe2pKu0";
// const API_KEY = process.env.FIREBASE_API_KEY;
// console.log("API KEY: ", API_KEY);

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  // console.log("url: ", url);

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  // console.log("Login flow check: ", response.data);
  const token = response.data.idToken;
  return token;
}

// // Create user
export function createUser(email, password) {
  // export async function createUser(email, password) {
  return authenticate("signUp", email, password);
  // await authenticate(email, password, "signUp");
}

// //  login
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

// // Other code versions// //
// // authenticate code with more error handling...
// async function authenticate(mode, email, password) {
//   const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

//   try {
//     const response = await axios.post(url, {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//     });
//     // console.log("Login flow check: ", response.data);
//     return response.data.idToken;
//   } catch (error) {
//     console.log(
//       "Error during authentication: ",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

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
