import Left from "./components/Left/Left.js";
import MovingBackground from "./components/MovingBackgroud/MovingBackground.js";
import Right from "./components/Right/Right.js";
import React, { useState } from "react";

function App() {
  const [active , setActive] = useState(1);
  
  const activeHandler = (id)=>{
    console.log("active handler claaed")
    setActive(id);
  }
  // const changeLayout = ()=>{

  //   setLayout(prev => prev === "row" ? "flex-row-reverse" : "flex-row");
  // }
  return (
      <>
    
      <MovingBackground/>
      <div className={`w-screen md:h-screen scroll-y-auto scroll-smooth  md:m-0 m-1 flex   transition-all md:flex-row flex-col md:flex-nowrap flex-wrap duration-500 bg-gray-300`}>
        <Left active={active} activeHandler={activeHandler} />
        <Right active={active}/>
      </div>
      
      </>
  );
}

export default App;
