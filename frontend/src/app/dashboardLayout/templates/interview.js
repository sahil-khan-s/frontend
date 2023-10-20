"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState ,useEffect } from "react";
import search from "../../../../public/assets/images/search.svg";
import Image from "next/image";
import { useAppContext } from '../../context/AppContext';
const jsonData = [
  {
    title: "Backend Developer",
    description: "Interview Of Backend Developer",
  },
  {
    title: "Accounting Officer",
    description: "Interview Of Accounting Officer",
  },
  {
    title: "Frontend Developer",
    description: "Interview Of Frontend Developer",
  },
  {
    title: "Graphics Officer",
    description: "Interview Of Graphics Officer",
  },
  {
    title: "HR Manager",
    description: "Interview Of HR Manager",
  },
  {
    title: "Marketing Officer",
    description: "Interview Of Marketing Officer",
  },
  {
    title: "Motion Graphics",
    description: "Interview Of Motion Graphics",
  },
  {
    title: "Project Manager",
    description: "Interview Of Project Manager",
  },
  {
    title: "UI Designer",
    description: "Interview Of UI/UX Designer",
  },
];

const InterviewCards = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = jsonData.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const [selectedTitle, setSelectedTitle] = useState('');
  const {contextQuestions, setContextQuestions } = useAppContext();
  const handleSendTitle = async (title) => {
    // Create a JSON object with the title
    const data = { title };
  
    // Send a POST request to  Flask backend
    try {
      const response = await fetch("http://localhost:5000/sendTitle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Request failed");
      }
  
      const responseData = await response.json();
      const receivedQuestions = responseData;
      setContextQuestions(receivedQuestions);
      console.log("questions",receivedQuestions)
      setSelectedTitle(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchTranscribeData = async () => {
    try {
        const response = await fetch("http://localhost:5000/transcribeVideo", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Request failed");
        }
         else 
           console.log("response successful")
        const data = await response.json();
        console.log(data,"transcribed data"); // Array of transcriptions
    } catch (error) {
        console.error("Error:", error);
    } 
};

  return (
    <div className=" mb-4">
      <div className="mb-12 w-[300px] mx-auto">
        <button className="bg-green-500 text-black p-2 mb-4" onClick={fetchTranscribeData}>Fetch transcribe Data</button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Templates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          <div className="absolute inset-y-0 right-6 flex items-center  pointer-events-none">
            <Image
              src={search}
              alt="Search Icon"
              height={5}
              className="w-5 h-5 text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 py-3 gap-4">
        {filteredData.map((item, index) => (
          <div key={index} className="card">
            <h2 className="font-bold text-2xl">{item.title}</h2>
            <p className="py-5 text-blue-800">{item.description}</p>
            <Link href="/dashboardLayout/templates/takeAnalysis">
            <div>
              <button
                onClick={() => handleSendTitle(item.title)}
                className="practice"
              >
                Practice Now
              </button>
            </div>

            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        p {
          font-weight: bold;
        }
        .card {
          border: 1px solid #ccc;
          padding: 20px;
          margin: 10px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 300px;
          display: flex;
          flex-direction: column;
          justify-items: center;
        }

        .practice {
          background-color: #8090f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          padding: 10px 20px;
          width: 250px;
        }
        .btn {
          width: 200px;
          background-color: gray;
          color: white;
          border: none;
          border-radius: 30%;
          cursor: pointer;
          padding: 11px 10px;
        }
      `}</style>
    </div>
  );
};

export default InterviewCards;
