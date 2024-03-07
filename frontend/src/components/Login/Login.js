import React from "react";
import HomeRight from "../UI/HomeRight";

function Login() {
  return (
    <>
      <HomeRight
        FormType="Login"
        goToMessage="Don't have an account? Signup"
        goto="/signup"
      />
    </>
  );
}

export default Login;
