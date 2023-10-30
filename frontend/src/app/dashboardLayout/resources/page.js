import React from 'react'
import PracticeNow from '../common/PracticeNow'

const page = () => {
  return (
<div className='container  mx-auto container 2xl:max-w-container xl:px-[128px] '>
    <div className='px-8 '>
 <div className=''>
      <h1 className='text-white pt-10 text-3xl text-center font-bold '>
     Resources 
      </h1>
        <div className='mt-16 w-[630px] mx-auto'>
        <PracticeNow/>
        <h1 className='text-center pt-5 text-white'>No Resource to Show</h1>
        </div>
    </div>
    </div>

</div>
   
  )
}

export default page