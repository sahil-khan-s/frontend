"use client"
import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

function Page() {
  const [videoStream, setVideoStream] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  // Function to request and initialize the video stream
  const initializeVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setPermissionGranted(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  useEffect(() => {
    // Initialize the video stream when the component mounts
    initializeVideoStream();
    // Cleanup the video stream when the component unmounts
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className='pt-4'>
      
      {permissionGranted ? (
        <>
        <p className='font-medium capitalize'>{status}</p>
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
            {status !== 'recording' ? (
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
        </>
      ) : (
        <p>Permission to access the camera is required. Please grant permission to continue.</p>
      )}
    </div>
  );
}

export default Page;
