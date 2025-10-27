import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import UseGlobalContext from "../../context/GlobalContext";

type UserCommonTypes = {
  FormType: "Signup" | "Login";
  goToMessage: string;
  goto: string;
};

function UserCommon({ FormType, goToMessage, goto }: UserCommonTypes) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const [alter1, setAlert1] = useState("");
  const fileref = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { loginHandler } = UseGlobalContext();

  const blankAlert1 = useCallback(() => {
    setTimeout(() => {
      setAlert1("");
    }, 2000);
  }, []);

  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (FormType === "Signup") {
          if (pass !== rePass) {
            setAlert1("Please Check The Password");
            blankAlert1();
          } else {
            try {
              await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                name: username,
                email,
                password: pass,
                pic,
              });
              // console.log(response.data);
              if (fileref.current) {
                fileref.current.value = "";
              }
              setUsername("");
              setEmail("");
              setRePass("");
              setPass("");
              navigate("/login");
            } catch (error) {
              if (axios.isAxiosError(error)) {
                // console.log("error happen");
                // console.log(error.response.data.message);
                setAlert1(
                  error?.response?.data?.message || "something went wrong"
                );
                blankAlert1();
              }
            }
          }
        } else {
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/login`,
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
            if (axios.isAxiosError(error)) {
              const msg =
                error.response?.data?.message || "something went wrong";
              setAlert1(msg);
              blankAlert1();
            }
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.error("Unexpected error", error);
        }
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

  const postDetails = async (pics: File) => {
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
            <form
              className="flex md:w-[50%] w-[90%] flex-col"
              onSubmit={submitHandler}
            >
              {FormType === "Signup" && (
                <div className="w-full  border border-black bg-none mb-1 rounded-md">
                  <input
                    required
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 bg-transparent outline-none rounded-md"
                  />
                </div>
              )}
              <div className="w-full  border border-black bg-none mb-1  rounded-md">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 bg-transparent outline-none rounded-md"
                />
              </div>

              <div className="relative  w-full  border border-black bg-none mb-1  rounded-md">
                <input
                  required
                  type={!show ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder={
                    FormType === "Signup" ? "Create password" : "Enter Password"
                  }
                  className=" w-full p-2 bg-transparent outline-none rounded-md"
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
                    className="w-full p-2 bg-transparent outline-none rounded-md"
                  />
                </div>
              )}

              {FormType === "Signup" && (
                <div className="w-full  border border-black bg-none mb-5 rounded-md">
                  <i className="m-1 w-[2%] fa-solid fa-file-arrow-up text-xl"></i>
                  <input
                    required
                    ref={fileref}
                    type="file"
                    accept="image/*"
                    placeholder="Profile Pic"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        postDetails(file);
                      }
                    }}
                    className="w-[96%] cursor-pointer  p-2 bg-transparent outline-none rounded-md"
                  />
                </div>
              )}

              <div className={`w-full   text-center py-2  bg-none`}>
                {loading ? (
                  <h1>Please wiat...</h1>
                ) : (
                  <button
                    type="submit"
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

export default UserCommon;
