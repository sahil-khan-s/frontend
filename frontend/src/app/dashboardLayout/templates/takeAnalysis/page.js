"use client";
import React, { useState, useEffect } from "react";
import { useReactMediaRecorder  } from "react-media-recorder";
import EmotionModal from "./modal";
import { useAppContext } from '../../../context/AppContext';
import { CircularProgress , Typography} from "@mui/material";
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
function Page() {
  const [videoStream, setVideoStream] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { status, startRecording, stopRecording, pauseRecording, resumeRecording, mediaBlobUrl  } =
  useReactMediaRecorder({ video: true });
  const [loading, setLoading] = useState(false);
  const [emotionsData, setEmotionsData] = useState(null);
  const [validateResult, setValidateResult] = useState(null);
  const [gazeData, SetGazeData] = useState(null);
  const { contextQuestions } = useAppContext();
  const [recording, setRecording] = useState(true);
  const [sendQuestion , setSendQuestion] = useState(null);
 
  // Function to request and initialize the video stream
   useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const setup = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Check if the component is still mounted before updating state
        if (isMounted) {
          setVideoStream(stream);
          setPermissionGranted(true);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    setup();

    return () => {
      isMounted = false; // Component is unmounting, update the flag
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  
  const [speech, setSpeech] = useState(new SpeechSynthesisUtterance(''));
  const [isSpeaking, setIsSpeaking] = useState(false);
  // Function to fetch emotions data
  const [openModal, setOpenModal] = useState(false);

  const fetchEmotionsAndGazeData = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/detect", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const gazeData = JSON.parse(data.gaze_tracking);
      const emotionsData = JSON.parse(data.emotions);
      setEmotionsData(emotionsData);
      SetGazeData(gazeData); // Set gazeData state
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setOpenModal(true);
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
        const validatedData = JSON.parse(data.validation)
        setValidateResult(validatedData)
        // console.log(data,"transcribed data"); // Array of transcriptions
    } catch (error) {
        console.error("Error:", error);
    } 
};
  const handleSend = async () => {
    if (!mediaBlobUrl) {
      console.error("No recorded video to send.");
      return;
    }

    // Fetch the recorded video as a Blob
    const response = await fetch(mediaBlobUrl);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("video", blob, "recorded_video.webm");

    // Send a POST request to your Flask backend
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/download", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log(data.message); // Should print "video downloaded" if the Flask endpoint is working

      // Fetch emotions data after sending the video
      fetchEmotionsAndGazeData();
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  };
 

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionArray = contextQuestions.questions; // Ensure it's an array


  const playQuestion = () => {
    if (questionArray && currentQuestionIndex >= 0 && currentQuestionIndex < questionArray.length) {
      speech.text = questionArray[currentQuestionIndex];
      window.speechSynthesis.speak(speech);
      setSendQuestion( questionArray[currentQuestionIndex]);
      setIsSpeaking(true);
    }
  };


  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (!isSpeaking) {
      playQuestion();
    }
  }, [currentQuestionIndex, questionArray, speech]);

  const handleNextQuestion = () => {
    if (isSpeaking) {
      // Stop speaking if currently speaking
      stopSpeaking();
    } else
     {
      if (currentQuestionIndex < questionArray.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
      }
    }
  };

  if (!questionArray || questionArray.length === 0) {
    return <p className="text-center text-white mt-4">Loading questions.....</p>;
  }
  const toggleRecording = () => {
    if (recording) {
      pauseRecording();
    } else {
      resumeRecording();
    }
    setRecording(!recording);
  };

  const sendQuestionToBackend = async () => {
    try {
      if (sendQuestion) {
        const response = await fetch('http://localhost:5000/receiveQuestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: sendQuestion }),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData.message); // Print the response message from the backend
        } else {
          throw new Error('Request failed');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className=" ">
      <div className=" w-[700px] mx-auto">
      <h2 className="font-bold py-2 text-xl text-start text-white">Question {currentQuestionIndex + 1}</h2>
      <p className="text-[16px] max-w-[700px] text-white font-medium">{questionArray[currentQuestionIndex]}</p>
      <button className="px-10 rounded-lg text-white my-1 py-1 custom-drawer-paper" onClick={handleNextQuestion }>{isSpeaking ? 'Stop' : 'Next'}</button>
    </div>
      {permissionGranted ? (
        <>
        <div className="relative">
          <div>
            
          </div>
        <div className=" flex flex-col items-center ">
          <h1 className="font-medium  capitalize text-white">Status : {status}</h1>
          <video
            className="  pb-4 w-[700px] rounded-xl rounded-b-xl"
            ref={(videoElement) => {
              if (videoElement && videoStream) {
                videoElement.srcObject = videoStream;
                videoElement.onloadedmetadata = () => {
                  videoElement.play().catch((error) => {
                    console.error("Error playing video:", error);
                  });
                };
              }
            }}
          />
        </div>
        <div className="flex gap-4 absolute bottom-[30px] left-[48%]">
        <button className="text-white" onClick={toggleRecording}>
          {recording ? <PauseCircleFilledRoundedIcon className="text-white text-[40px]" /> :<PlayCircleFilledRoundedIcon className=" text-red-700 text-[40px]"/>}
        </button>
         </div>
        </div>

          <div className=" flex justify-center">
            {status !== "recording"  ? (
              <button
                onClick={startRecording}
                className=" custom-drawer-paper hover:bg-blue-700 text-white font-bold py-2 px-36 rounded-full"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-36 rounded-full"
              >
                Stop Recording
              </button>
            )}
          </div>

          {mediaBlobUrl && (
            <div>
              <p className="text-center pt-2 text-white">Submit Recorded Video:</p>
            </div>
          )}
          <div className="flex justify-center pt-4 pb-5 ">
            {loading ? ( // Display loader while loading is true
             <div className="p-4 mt-6 text-center  absolute top-[50%] left-[50%]">
                <CircularProgress style={{height:"100px" , width:"100px" , color :"white"}}  />
             </div>
            ) : (
              <button
                onClick={()=>{
                  handleSend()
                  sendQuestionToBackend()
                  fetchTranscribeData()
                }}
                disabled={loading}
                className={`modal hover:bg-green-700 text-white font-bold py-2 cursor-pointer px-24 rounded-full`}
              >
                Submit
              </button>
            )}
          </div>


           {/* <button className="bg-red-600 mb-5 p-2" onClick={fetchTranscribeData}>fetchTranscribeData</button> */}

           
          {openModal && (
            <EmotionModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              emotionsData={emotionsData}
              gazeData={gazeData}
              validateResult={validateResult}
            />
          )}
        </>
      ) : (
        <p>
          Permission to access the camera is required. Please grant permission
          to continue.
        </p>
      )}
    </div>
  );
}

export default Page;
