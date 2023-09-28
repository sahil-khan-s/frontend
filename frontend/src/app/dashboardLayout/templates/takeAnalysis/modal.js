import React from "react";
import { Modal, Box, Typography, LinearProgress } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar"; // Import circular progress bar component
import "react-circular-progressbar/dist/styles.css"; // Import styles for the circular progress bar

function EmotionModal({ open, onClose, emotionsData, gazeData }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 800,
          backgroundColor: "white",
          border: "2px solid #000",
          boxShadow: 24,
          left: "30%",
          top: "3%",
          p: 4,
          borderRadius:"15px"
        }}
      >
        {emotionsData ? (
          <div className="border-2 border-blue-600 rounded-xl p-3">
            <Typography style={{ fontWeight: "bold" , textAlign:"center"}} variant="h5">
              Detected Emotions
            </Typography>
            <div className="emotion-container">
              {emotionsData.map((emotion) => (
                <div key={emotion.name} className="emotion-item capitalize">
                  <Typography
                    style={{ fontWeight: "bold" }}
                    variant="subtitle1"
                  >
                    {emotion.name}
                  </Typography>
                  <div className="circular-progress">
                    <CircularProgressbar
                      value={parseFloat(emotion.score)}
                      text={`${emotion.score}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <Typography variant="h5">Loading for Emotion-Detection...</Typography>
            <LinearProgress />
          </div>
        )}

{gazeData && gazeData.length > 0 ? (
  <div className=" mt-3 border-2 border-blue-600 rounded-xl p-3 ">
    <Typography style={{ fontWeight: "bold" , textAlign:"center" }} variant="h5">
      Detected Gaze Data
    </Typography>
    <div className="emotion-container">
      {gazeData.map((gaze) => (
        <div key={gaze.name} className="emotion-item capitalize">
          <Typography
            style={{ fontWeight: "bold" }}
            variant="subtitle1"
          >
            {gaze.name}
          </Typography>
          <div className="circular-progress">
            <CircularProgressbar
              value={parseFloat(gaze.score)}
              text={`${gaze.score}`}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <div>
    <Typography variant="h5">Loading for Gaze_detection...</Typography>
    <LinearProgress />
  </div>
)}




      </Box>
    </Modal>
  );
}

export default EmotionModal;
