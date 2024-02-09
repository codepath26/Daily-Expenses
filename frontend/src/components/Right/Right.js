import React from 'react'
import Righinnder from './Righinnder'

function Right({active}) {
  return (
    <div className='md:w-[90%] w-full relative  pt-3 md:pt-0 md:m-4  mx-auto'>
    <div className='border-[3px] border-white bg-gray-200 bg-opacity-80  rounded-[20px]'>
      <Righinnder active={active} />
    </div>
    </div>
  )
}

export default Right;