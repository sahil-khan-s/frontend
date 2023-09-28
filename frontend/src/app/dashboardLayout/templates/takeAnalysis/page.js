"use client";
import React, { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import EmotionModal from "./modal";
function Page() {
  const [videoStream, setVideoStream] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });
  const [loading, setLoading] = useState(false);
  const [emotionModalOpen, setEmotionModalOpen] = useState(false);
  const [emotionsData, setEmotionsData] = useState(null);

  // Function to request and initialize the video stream
  const initializeVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setPermissionGranted(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  useEffect(() => {
    initializeVideoStream();
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Function to fetch emotions data
  const [openModal, setOpenModal] = useState(false);

  const fetchEmotionsData = async () => {
    setLoading(true);
    setOpenModal(true);
  
    try {
      const response = await fetch("http://localhost:5000/detect", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Request failed");
      }
  
      const data = await response.json();
      setEmotionsData(data.emotions); // Assuming the data structure is { emotions: [...] }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  //backend logic
  const handleSend = async () => {
    if (!mediaBlobUrl) {
      console.error("No recorded video to send.");
      return;
    }

    // Fetch the recorded video as a Blob
    const response = await fetch(mediaBlobUrl);
    const blob = await response.blob();

    // Create a FormData object and append the Blob
    const formData = new FormData();
    formData.append("video", blob, "recorded_video.webm");

    // Send a POST request to your Flask backend
    try {
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
      fetchEmotionsData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="pt-4">
      {permissionGranted ? (
        <>
          <h1 className="font-medium  capitalize">Status : {status}</h1>
          <video
            className=" pb-4 w-[700px] rounded-xl rounded-b-xl"
            ref={(videoElement) => {
              if (videoElement && videoStream) {
                videoElement.srcObject = videoStream;
                videoElement.play();
              }
            }}
          />
          <div className="flex justify-center">
            {status !== "recording" ? (
              <button
                onClick={startRecording}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-36 rounded-full"
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
              <p>Recorded Video:</p>
              <video
                className="my-4 w-[700px] rounded-xl rounded-b-xl"
                src={mediaBlobUrl}
                controls
                // autoPlay
                // loop
              />
            </div>
          )}
          <div className="flex justify-center pt-4 pb-5">
          <button
            onClick={handleSend}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 cursor-pointer px-24 rounded-full`}
          >
            Submit
          </button>
          </div>

          <EmotionModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            emotionsData={emotionsData}
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
