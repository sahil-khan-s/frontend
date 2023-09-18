"use client"
import React from 'react'
import { useState } from 'react';
import PracticeNow from '../common/PracticeNow'
import search from '../../../../public/assets/images/search.svg'
import Image from 'next/image';
const interviewData = require('./interview.json');
const page = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [filterCategory, setFilterCategory] = useState('');

  const filterInterviews = (category, text) => {
    if (
      (filterCategory === '' || filterCategory === category.category) &&
      (text === '' ||
        category.category.toLowerCase().includes(text.toLowerCase()) ||
        category.interviews.some((interview) =>
          interview.toLowerCase().includes(text.toLowerCase())
        ))
    ) {
      return true;
    }
    return false;
  };

  const categoryButtons = [
    'Backend Developer',
    'Accounting Officer',
    'Frontend ',
    'Graphics',
    'HR',
    'Marketer',
    'Motion',
   
  ];
  return (
<div className='container templates mx-auto container 2xl:max-w-container xl:px-[128px] '>
    <div className='px-8]'>
 <div className=''>
      <h1 className='pt-10 text-3xl font-bold '>
     Templates 
      </h1>
        <div className='mt-16 w-[630px] mx-auto'>
        <PracticeNow/>
        </div> 
        <div className='pt-14'>
        <div className="mb-12 w-[300px] mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Templates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          <div className="absolute inset-y-0 right-6 flex items-center  pointer-events-none">
            <Image src={search} alt="Search Icon" height={5} className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div>
      <div className="mb-4 p-5">
        {categoryButtons.map((buttonText, index) => (
          <button
            key={index}
            className={`bg-gray-100 text-black py-2 px-3 rounded-full mx-2 ${
              filterCategory === buttonText ? 'bg-blue-700' : ''
            }`}
            onClick={() => setFilterCategory(buttonText)}
          >
            {buttonText}
          </button>
        ))}
      </div>
      {interviewData.map((category) => (
        filterInterviews(category, searchQuery) && (
          <div key={category.category} className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 py-3 gap-4">
            {category.interviews.map((interview, index) => (
              <div key={index} className="card">
                <button className="btn">{category.category}</button>
                <p className="my-5">{interview}</p>
                <button className="practice">Practice Now</button>
              </div>
            ))}
          </div>
        )
      ))}
      <style jsx>{`
      p{
        font-weight: bold;
      }
        .card {
          border: 1px solid #ccc;
          padding: 20px;
          margin: 10px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 300px ;
          display:flex  ;
          flex-direction : column ;
          justify-items: center 
        }

        .practice {
          background-color: #8090f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          padding: 10px 20px
        }
        .btn{
          width: 200px;
          background-color: gray;
          color: white;
          border: none;
          border-radius: 30%;
          cursor: pointer;
          padding:11px 10px;
        }
      `}</style>
    </div>
    </div>
     
    </div>
    </div>
    
    

</div>
   
  )
}

export async function getStaticProps() {
  return {
    props: {
      data: interviewData, // Pass the imported JSON data as a prop
    },
  };
}


export default page