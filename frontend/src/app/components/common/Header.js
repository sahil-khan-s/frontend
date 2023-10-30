import React  from 'react'
import Image from 'next/image'
import Link from 'next/link'
import devsort from '../../../../public/assets/images/devsort.png'
function Header() {
  return (
    <div className='bg-white attachment opacity-[0.9]'>
    <div className='   mx-auto container 2xl:max-w-container xl:px-[128px]'>
        <nav className=" py-4 flex justify-between  items-center ">
      <div className="flex items-center">
        <Image src={devsort} alt="Logo" width={170} height={100} className="" />
      </div>
      <div className="flex items-center text-blue-800 text-xl space-x-8">
        <Link href="/">
          <h1 className=" font-bold">Prices</h1>
        </Link>
        <Link href="/">
          <h1 className=" font-bold">Resources</h1>
        </Link>
        <Link href="/login">
          <h1 className=" font-bold">Login</h1>
        </Link>
      </div>
    </nav>
    </div>
    </div>
  )
}

export default Header