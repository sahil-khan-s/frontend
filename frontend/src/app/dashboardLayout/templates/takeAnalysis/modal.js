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
          borderRadius: "15px",
        }}
      >
        {emotionsData ? (
          <div className="border-2 border-blue-600 rounded-xl p-3">
            <Typography
              style={{ fontWeight: "bold", textAlign: "center" }}
              variant="h5"
            >
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
            <Typography variant="h5">
              Loading for Emotion-Detection...
            </Typography>
            <LinearProgress />
          </div>
        )}

        {gazeData && (
          <div>
            <h2>Gaze Data</h2>
            <ul>
              <li>Eye Blinking: {gazeData["Eye Blinking"]}</li>
              <li>Looking right: {gazeData["Looking right"]}</li>
              <li>Looking left: {gazeData["Looking left"]}</li>
              <li>Looking center: {gazeData["Looking center"]}</li>
            </ul>
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default EmotionModal;
