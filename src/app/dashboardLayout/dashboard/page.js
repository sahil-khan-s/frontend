import React from 'react'
import PracticeNow from '../common/PracticeNow'

const page = () => {
  return (
<div className=' container  mx-auto container 2xl:max-w-container xl:px-[128px]'>
    <div className='px-8 '>
 <div className=''>
      <h1 className='pt-10 text-start text-3xl font-bold '>
     Dashboard 
      </h1>
        <div className='mt-16 w-[630px] mx-auto'>
        <PracticeNow/>
        </div>
    </div>
    </div>

</div>
   
  )
}

export default page