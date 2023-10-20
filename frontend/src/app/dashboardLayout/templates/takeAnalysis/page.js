"use client";
import React, { useState, useEffect } from "react";
import RecordRTC from "recordrtc";
import EmotionModal from "./modal";
import { useAppContext } from '../../../context/AppContext';
import { CircularProgress , Typography} from "@mui/material";

function Page() {
  const [videoStream, setVideoStream] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emotionsData, setEmotionsData] = useState(null);
  const [gazeData, SetGazeData] = useState(null);
  const { contextQuestions } = useAppContext();
  const [isRecording, setIsRecording] = useState(false);
  // Function to request and initialize the video stream
  useEffect(() => {
    let isMounted = true;

    const setup = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        if (isMounted) {
          setVideoStream(stream);
          setPermissionGranted(true);

          if (stream) {
            const mediaRecorder = new RecordRTC(stream, {
              type: "video",
              mimeType: "video/mp4",
            });
            setRecorder(mediaRecorder);
          }
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    setup();

    return () => {
      isMounted = false;
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
      console.log(data , "ddd");
      setEmotionsData(emotionsData);
      SetGazeData(gazeData); // Set gazeData state
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setOpenModal(true);
    }
  };

 
  const startRecording = () => {
    if (recorder) {
      setIsRecording(true); // Update recording state
      recorder.startRecording();
    }
  };

  const stopRecording = () => {
    if (recorder) {
      setIsRecording(false); // Update recording state
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        setRecordedBlob(blob);
      });
    }
  };

 

  const handleSend = async () => {
    if (!recordedBlob) {
      console.error("No recorded video to send.");
      return;
    }

    // Fetch the recorded video as a Blob
    const formData = new FormData();
    formData.append("video", recordedBlob, "recorded_video.mp4");

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
 
  const { status } = recorder || {};
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionArray = contextQuestions.questions; // Ensure it's an array
  
  const playQuestion = () => {
    if (questionArray && currentQuestionIndex >= 0 && currentQuestionIndex < questionArray.length) {
      speech.text = questionArray[currentQuestionIndex];
      window.speechSynthesis.speak(speech);
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
    return <p>Loading questions.....</p>;
  }

  return (
    <div className=" ">
      <div className=" max-w-[800px]">
      <h2 className="font-bold py-2 text-xl ">Question {currentQuestionIndex + 1}</h2>
      <p className="text-[16px] max-w-[700px]">{questionArray[currentQuestionIndex]}</p>

      <button className="px-10 rounded-lg text-white my-1 py-1 bg-gray-400" onClick={handleNextQuestion}>{isSpeaking ? 'Stop' : 'Next'}</button>
    </div>
    {permissionGranted  && recorder ? (
        <>
          <h1 className="font-medium capitalize">Status: {status}</h1>
          <video
            className="pb-4 w-[700px] rounded-xl rounded-b-xl"
            ref={(videoElement) => {
              if (videoElement && videoStream) {
                videoElement.srcObject = videoStream;
                videoElement.play();
              }
            }}
          />
          <div className="flex justify-center">
           
              <button
                onClick={startRecording}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
              >
                Start Recording
              </button>
     
              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full"
              >
                Stop Recording
              </button>
        
          </div>

          {recordedBlob && (
            <div>
              <p className="text-center pt-2">Submit Recorded Video:</p>
            </div>
          )}
          <div className="flex justify-center pt-4 pb-5 ">
            {loading ? (
              <div className="p-4 mt-6 text-center  absolute top-[30%] left-[50%]">
                <Typography variant="h5" style={{ color: "white" }}>
                  Loading
                </Typography>
                <CircularProgress
                  style={{ height: "100px", width: "100px", color: "white" }}
                />
              </div>
            ) : (
              <button
                onClick={handleSend}
                disabled={loading}
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 cursor-pointer px-24 rounded-full`}
              >
                Submit
              </button>
            )}
          </div>

          <EmotionModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            emotionsData={emotionsData}
            gazeData={gazeData}
          />
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
