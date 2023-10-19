import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import devsort from '../../../../public/assets/images/devsort.png'
function Footer() {
  return (
    <div className=''>
    <div className=' px-4 '>
        <nav className=" py-4  flex items-center space-x-14 items-center ">
      <div className="flex items-center">
        <Image src={devsort} alt="Logo" width={130} height={100} className="" />
      </div>
      <div>
        <span>
        © 2032 Prepare Interview
        </span>
      </div>
      <div className="flex items-center space-x-6 text-bold text-xl text-blue-800">
        <Link href="/">
          <h1 className=" font-medium">Pricing</h1>
        </Link>
        <Link href="/">
          <h1 className=" font-medium">Resources</h1>
        </Link>
        <Link href="/">
          <h1 className=" font-medium">Product</h1>
        </Link>
        <Link href="/">
          <h1 className=" font-medium">Support</h1>
        </Link>
      </div>
    </nav>
    </div>
    </div>
  )
}

export default Footer