import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { AuthContext } from "../store/auth-context";

function LoginScreen({ email, password }) {
  const [authenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  // console.log("AuthContext (loginScreen): ", authCtx);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      // await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      // console.log("LoginScreen error: ", error);
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (authenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
