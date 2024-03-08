import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/globalContext";
// import { ChatState } from "../../context/ChatProvider";

function HomeRight({ FormType, goToMessage, goto }) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const [alter1, setAlert1] = useState("");
  const fileref = useRef();
  const navigate = useNavigate();
  const { loginHandler } = useGlobalContext();

  const blankAlert1 = useCallback(() => {
    setTimeout(() => {
      setAlert1("");
    }, 2000);
  }, []);

  const submitHandler = useCallback(
    async (e) => {
      // console.log("submit hadler is runn");
      // const {} = ChatState();
      e.preventDefault();
      try {
        //  First Check the both password if metch or not;

        if (FormType === "Signup") {
          // console.log(process.env.REACT_APP_API_URL);
          if (pass !== rePass) {
            setAlert1("Please Check The Password");
            blankAlert1();
          } else {
            try {
              await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                name: username,
                email,
                password: pass,
                pic,
              });
              // console.log(response.data);
              fileref.current.value = null;
              setUsername("");
              setEmail("");
              setRePass("");
              setPass("");
              navigate("/login");
            } catch (error) {
              // console.log("error happen");
              // console.log(error.response.data.message);
              setAlert1(
                error?.response?.data?.message || "something went wrong"
              );
              blankAlert1();
            }
          }
        } else {
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/login`,
              {
                email,
                password: pass,
              }
            );
            console.log(response.data);
            setEmail("");
            setPass("");

            const userdata = {
              ...response.data.user,
              token: response.data.token,
            };
            // const userdata = JSON.stringify(response.data.user);
            console.log(userdata);
            localStorage.setItem("expenseUser", JSON.stringify(userdata));
            loginHandler(userdata);
            navigate("/dashboard");
          } catch (error) {
            // console.log("this is the error");
            const msg = error.response.data.message;
            setAlert1(msg);
            blankAlert1();
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [
      FormType,
      email,
      username,
      pass,
      pic,
      navigate,
      rePass,
      blankAlert1,
      loginHandler,
    ]
  );

  const postDetails = async (pics) => {
    setLoading(true);
    if (pics === undefined) {
      setAlert1("Please Select an Image!");
      setLoading(false);
      blankAlert1();
      return;
    }
    // console.log(pics.type, "this isthe tipe");
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "realtimechat02");
      fetch("https://api.cloudinary.com/v1_1/realtimechat02/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
          // console.log(data.url.toString());
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="md:w-full h-screen bg-[url('assets/bg.jpg')] bg-cover bg-center  w-full p-2">
        <div className="py-2  w-full h-full">
          <h1 className="text-center  text-green-800 font-bold  text-3xl">
            {FormType} Page
          </h1>
          <p className="bg-red-600 text-center  my-2 text-white rounded-lg ">
            {alter1}
          </p>
          <div className=" h-full flex flex-col  mt-10 items-center ">
            <form className="flex md:w-[50%] w-[90%] flex-col  ">
              {FormType === "Signup" && (
                <div className="w-full  border border-black bg-none mb-5 rounded-md">
                  <input
                    required
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-white  h-full p-2 bg-transparent outline-none rounded-md"
                  />
                </div>
              )}
              <div className="w-full  border border-black bg-none mb-5  rounded-md">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-white  h-full p-2 bg-transparent outline-none rounded-md"
                />
              </div>

              <div className="relative  w-full  border border-black bg-none mb-5  rounded-md">
                <input
                  required
                  type={!show ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder={
                    FormType === "Signup" ? "Create password" : "Enter Password"
                  }
                  className="w-full text-white  h-full p-2 bg-transparent outline-none rounded-md"
                />
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <i className="fa-solid  fa-eye"></i>
                  ) : (
                    <i className="fa-solid  fa-eye-slash"></i>
                  )}{" "}
                </span>
              </div>

              {FormType === "Signup" && (
                <div className="w-full  border border-black bg-none mb-5 rounded-md">
                  <input
                    required
                    type={!show ? "text" : "password"}
                    value={rePass}
                    onChange={(e) => setRePass(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full text-white  h-full p-2 bg-transparent outline-none rounded-md"
                  />
                  <i className="bx bx-hide eye-icon"></i>
                </div>
              )}
              {FormType === "Signup" && (
                <div className="w-full  border border-black bg-none mb-5 rounded-md">
                  <input
                    required
                    ref={fileref}
                    type="file"
                    accept="image/*"
                    placeholder="Profile Pic"
                    p={1.5}
                    onChange={(e) => {
                      postDetails(e.target.files[0]);
                    }}
                    className="w-full text-white  h-full p-2 bg-transparent outline-none rounded-md"
                  />
                  <i className="bx bx-hide eye-icon"></i>
                </div>
              )}

              <div className={`w-full   text-center py-2  bg-none`}>
                {loading ? (
                  <h1>Please wiat...</h1>
                ) : (
                  <button
                    type="submit"
                    onClick={submitHandler}
                    className={` px-2 py-1 text-white hover:bg-green-600  bg-green-700 border rounded-md `}
                  >
                    {loading ? "" : FormType}
                  </button>
                )}
              </div>
            </form>
            <div className="text-green-500  mt-10 hover:text-white text-lg  font-bold transition-all duration-300">
              <span>
                <Link to={goto} className="underline  underline-offset-2">
                  {goToMessage}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeRight;
