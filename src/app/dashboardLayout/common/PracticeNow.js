"use client"
import React from 'react'
import { useState } from 'react';

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
    <div className='bg-gray-200 h-[170px] w-[630px] rounded-lg pt-8 '>
      <p className='text-center'>
        Hi, I want to become a {""}
        <select className='text-green-600 text-center bg-transparent ' value={selectedOption} onChange={handleOptionChange}>
          {options.map((option) => (
            <option className='' key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {""} can you help me prepare?
      </p>

      <div className='flex justify-center mt-5'>
      <button className='bg-white rounded-lg py-3 px-10'>
        Practice Now <span className='font-medium px-2 text-2xl'>+</span>
      </button>
      </div>
      
    </div>
  );
};

export default Dropdown;
