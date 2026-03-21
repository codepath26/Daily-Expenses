import React from "react";
import HomeRight from "../UI/HomeRight";

function Signup() {
  return (
    <>
      <HomeRight
        FormType="Signup"
        goToMessage="Already have an account? Login"
        goto="/login"
      />
    </>
  );
}

export default Signup;
