"use client"
import React from 'react'
import { useState } from 'react';
import PracticeNow from '../common/PracticeNow'
// import interviewData from "./interview.json" // Import the JSON data
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
    'Project Manager',
    'UI',
  ];
  return (
<div className='container'>
    <div className='px-8 w-[100%]'>
 <div className=''>
      <h1 className='pt-10 text-3xl font-bold '>
     Templates 
      </h1>
        <div className='mt-16 ml-60'>
        <PracticeNow/>
        </div> 
        <div className='pt-14'>
        <div className="mb-12 w-[340px] mx-auto">
        <input
          type="text"
          placeholder="Search by category "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className=" py-3 px-5 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>
      <div>
      <div className="mb-4">
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
          <div key={category.category} className="grid grid-cols-3">
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