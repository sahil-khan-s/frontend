"use client"
import React from 'react'
import { useState } from 'react';
import PracticeNow from '../common/PracticeNow'
// import interviewData from "./interview.json" // Import the JSON data
const interviewData = require('./interview.json');
const page = ({data}) => {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  const filterInterviews = (category, text) => {
    if (
      (!searchCategory || category.toLowerCase().includes(searchCategory.toLowerCase())) &&
      (!searchText || category.interviews.some(interview => interview.toLowerCase().includes(searchText.toLowerCase())))
    ) {
      return true;
    }
    return false;
  };
  return (
<div className=''>
    <div className='px-8 w-[100%]'>
 <div className=''>
      <h1 className='pt-10 text-3xl font-bold '>
     Templates 
      </h1>
        <div className='mt-16 ml-60'>
        <PracticeNow/>
        </div> 
        <div className='pt-24'>
    
      <div>
  
      {interviewData.map((category) => (
        <div key={category.category} className='grid grid-cols-3 '>
          {category.interviews.map((interview, index) => (
            <div key={index} className="card">
              <button className='btn'>{category.category}</button>
              <p className='my-5'>{interview}</p>
              <button className='practice '>Practice Now</button>
            </div>
          ))}
        </div>
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
          background-color: #0090f3;
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