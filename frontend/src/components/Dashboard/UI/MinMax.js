import React from 'react'

function MinMax({data}) {
  return (
    <>
        <div className="w-full px-5 py-2  ">
      <div className='flex justify-between w-full'>
        <span className='text-sm font-[500]'>min</span>
        <span className='text-xl font-[500]'>{data}</span>
        <span className='text-sm font-[500]'>max</span>
      </div>
    </div>
    
    </>
  )
}

export default MinMax;