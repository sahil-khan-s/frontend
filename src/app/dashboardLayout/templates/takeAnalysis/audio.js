"use client"
import React, { useState, useEffect } from 'react';

function AudioComponent() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions using the GET method
    fetch('http://localhost:5000/api/questions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Network response not ok:', response);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        // Convert and play questions as audio
        data.forEach((question, index) => {
          const utterance = new SpeechSynthesisUtterance(question);
          // Optional: Customize the voice and other settings if needed
        //   utterance.voice = window.speechSynthesis.getVoices()[6];
        //   utterance.rate = 1; // Adjust the speaking rate if needed
          speechSynthesis.speak(utterance);
        });
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Questions:</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}

export default AudioComponent;
