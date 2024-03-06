import Left from "./components/Left/Left.js";
import MovingBackground from "./components/MovingBackgroud/MovingBackground.js";
import Right from "./components/Right/Right.js";
import React, { useState } from "react";

function App() {
  // console.log(window);
  const [active, setActive] = useState(1);
  const activeHandler = (id) => {
    console.log("active handler claaed");
    setActive(id);
  };
  // const changeLayout = ()=>{

  //   setLayout(prev => prev === "row" ? "flex-row-reverse" : "flex-row");
  // }
  return (
    <>
      <MovingBackground />
      <div
        className={`p-3 border border-red-700 flex md:flex-row flex-col w-full md:h-screen overflow-hidden`}
      >
        <Left active={active} activeHandler={activeHandler} />
        <Right active={active} />
      </div>
    </>
  );
}

export default App;

// className={`md:w-screen md:h-screen overflow-y-scroll scroll-smooth md:overflow-y-hidden md:m-0 m-1 flex transition-all md:flex-row flex-col md:flex-nowrap flex-wrap duration-500 bg-gray-300 container`}
