import React from 'react'
import Righinnder from './Righinnder'

function Right({active}) {
  return (
    <div className='relative  border-[3px] border-white bg-gray-100 bg-opacity-80  m-4  w-[80%]  rounded-[20px]'>
      <Righinnder active={active} />
    </div>
  )
}

export default Right;