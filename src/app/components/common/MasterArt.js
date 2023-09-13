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
         <div className={` ${className}`}>
            <h1 className={` ${className2}`}>{title}</h1>
            <p className={` ${className3}`}>
              {discription}
            </p>
            <div className={`${btnstyle} border-2 rounded-full bg-white py-2 mt-4 max-w-[400px]`}>
                <form>
              <input style={{border: "none"}} className="border-none  ml-4" type="text" placeholder="Enter your email address" />
              <Link href="dashboardLayout">
             <button className=" bg-yellow-400 py-2 px-3 rounded-full">{btnText}</button>
             </Link>
             </form>
            </div>
          </div>
    </div>
  )
}

export default MasterArt