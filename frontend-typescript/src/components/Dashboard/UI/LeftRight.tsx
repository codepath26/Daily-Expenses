import React from 'react'

function LeftRight({left , right ,textColor}) {
  return (
    <>
      <div className={` shadow-md hover:shadow-lg bg-gray-200 border-2 border-white flex text-${textColor}-600 justify-between font-[100] text-[1rem] p-2 w-[95%] rounded-[10px] mb-5`}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
    </>
  )
}

export default LeftRight