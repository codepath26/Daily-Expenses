import React from "react";
// import HomeLeft from "../UI/HomeLeft";
import HomeRight from "../UI/HomeRight";

function Signup() {
  return (
    // {/* <HomeLeft imgurl="/images/bg02.png" /> */}
    <HomeRight
      FormType="Signup"
      goToMessage="Already have an account? Login"
      goto="/login"
    />
  );
}

export default Signup;
