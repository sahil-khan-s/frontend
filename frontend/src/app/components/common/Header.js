import React  from 'react'
import Image from 'next/image'
import Link from 'next/link'
import devsort from '../../../../public/assets/images/devsort.png'
function Header() {
  return (
    <div className=''>

   
    <div className='  mx-auto container 2xl:max-w-container xl:px-[128px]'>
        <nav className=" py-4 flex justify-between items-center ">
      <div className="flex items-center">
        <Image src={devsort} alt="Logo" width={130} height={100} className="" />
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/">
          <h1 className=" font-medium">Prices</h1>
        </Link>
        <Link href="/">
          <h1 className=" font-medium">Resources</h1>
        </Link>
        <Link href="/login">
          <h1 className=" font-medium">Login</h1>
        </Link>
      </div>
    </nav>
    </div>
    </div>
  )
}

export default Header