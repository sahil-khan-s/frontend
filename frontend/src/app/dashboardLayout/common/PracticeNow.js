"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('Software Engineer');

  const options = [
    'Software Engineer',
    'Web Developer',
    'Data Scientist',
    'UX Designer',
    ' App Developer',
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className='custom-drawer-paper shadow h-[188px] w-[630px] rounded-lg  pt-8 shadow'>
      <p className='text-start px-10 text-xl text-white font-bold'>
        Hi, I want to become a {""}
        <select className='text-green-900 text-center bg-transparent ' value={selectedOption} onChange={handleOptionChange}>
          {options.map((option) => (
            <option className='' key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {""} can you help me prepare?
      </p>
      {/* <Link href="/dashboardLayout/templates/takeAnalysis"> */}
      <div className='flex justify-center mt-5  '>
      <button className='modal text-white font-bold border-2 rounded-lg py-2 px-24 '>
        Click Here <span className='font-medium px-2 text-2xl'>+</span>
      </button>
      </div>
      {/* </Link> */}
      
    </div>
  );
};

export default Dropdown;
