import UserCommon from "../../common/UserCommon";

function Login() {
  return (
    <>
      <UserCommon
        FormType="Login"
        goToMessage="Don't have an account? Signup"
        goto="/signup"
      />
    </>
  );
}

export default Login;
