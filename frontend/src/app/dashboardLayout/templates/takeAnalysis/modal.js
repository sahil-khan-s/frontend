import React from "react";
import { Modal, Box, Typography, LinearProgress } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar"; // Import circular progress bar component
import "react-circular-progressbar/dist/styles.css"; // Import styles for the circular progress bar

function EmotionModal({ open, onClose, emotionsData }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 600,
          backgroundColor: "white",
          border: "2px solid #000",
          boxShadow: 24,
          left: "40%",
          top: "20%",
          p: 4,
        }}
      >
        {emotionsData ? (
          <div>
            <Typography style={{fontWeight:"bold"}} variant="h5">Detected Emotions</Typography>
            <div className="emotion-container">
              {emotionsData.map((emotion) => (
                <div key={emotion.name} className="emotion-item capitalize">
                  <Typography style={{fontWeight: "bold" ,  }} variant="subtitle1">{emotion.name}</Typography>
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
            <Typography variant="h5">Loading...</Typography>
            <LinearProgress />
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default EmotionModal;
