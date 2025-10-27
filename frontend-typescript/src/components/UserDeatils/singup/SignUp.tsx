import UserCommon from "../../common/UserCommon";

function Signup() {
  return (
    <UserCommon
      FormType="Signup"
      goToMessage="Already have an account? Login"
      goto="/login"
    />
  );
}

export default Signup;
