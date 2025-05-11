import AsyncStorage from "@react-native-async-storage/async-storage";
import { Children, createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  // // // While the code works, when loading the screen we also see blur of login screen which is not good. so we move the code to
  // // //  App.js and prolong the loading screen / flash screen until done fetching the token...
  // useEffect(() => {
  //   async function fetchToken() {
  //     const storedToken = await AsyncStorage.getItem("token");

  //     // // if return a stored token at the start of the app, then set it as the authToken...
  //     // //  Auto login...
  //     if (storedToken) {
  //       setAuthToken(storedToken);
  //     }
  //   }

  //   fetchToken();
  // }, []);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token); // Note: token should be string... key can be whatever we want, in this case token
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    // to expose the above two functions through context, we
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
