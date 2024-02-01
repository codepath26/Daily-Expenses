
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
  return (
      <>
      <MovingBackground/>
      <div className="w-screen h-screen flex bg-gray-300">
        <Left active={active} activeHandler={activeHandler}/>
        <Right active={active}/>
      </div>
      
      </>
  );
}

export default App;
