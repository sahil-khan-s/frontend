"use client"
import React from 'react'
import { useReactMediaRecorder } from "react-media-recorder";
function page() {
    const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: { facingMode: 'environment' } });
  
  return (
    <div>
        <p>{status}</p>
     <button
  onClick={startRecording}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Start Recording
</button>
<button
  onClick={stopRecording}
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
>
  Stop Recording
</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
  )
}

export default page