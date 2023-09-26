"use client";
import React, { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
function Page() {
  const [videoStream, setVideoStream] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });
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
    fetch("http://localhost:5000/download", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Should print "video downloaded" if the Flask endpoint is working
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  
  

  return (
    <div className="pt-4">
      {permissionGranted ? (
        <>
          <p className="font-medium capitalize">{status}</p>
          <video
            className=" pb-4 w-[600px]"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Stop Recording
              </button>
            )}
          </div>

          {mediaBlobUrl && (
            <div>
              <p>Recorded Video:</p>
              <video
                className="my-4 w-[600px]"
                src={mediaBlobUrl}
                controls
                autoPlay
                loop
              />
            </div>
          )}

          <button
            onClick={handleSend}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 cursor-pointer px-4 rounded `}
            
          >
            Send
          </button>
          
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