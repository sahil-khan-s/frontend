import React from 'react'
import Link from 'next/link'
function MasterArt({
title,
discription ,
btnText,
className,
className2,
className3,
btnstyle,
}) {
  return (
    <div>
         <div className={` ${className}  mt-3`}>
            <h1 className={` ${className2} text-blue-800 text-center `}>{title}</h1>
            <p className={` ${className3} text-center py-4  text-[23px]`}>
              {discription}
            </p>
            <div className="text-center text-blue-800">
             
           
             <p className="text-white mb-8 text-[21px]">
               Join thousands of successful candidates who trust Interview
               Buddy as their go-to interview preparation tool. Sign up today
               and start your journey towards interview success.
             </p>
             {/* Add your call-to-action button here if needed */}
           </div>
            <div className={`${btnstyle}   mt-5 flex justify-center` }>
              <Link href="/login">
             <button className="  layout border border-white py-4 font-bold px-14 text-white rounded-full">{btnText}</button>
             </Link>
            </div>
            
          </div>
    </div>
  )
}

export default MasterArt