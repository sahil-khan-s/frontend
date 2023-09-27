import React from "react";
import { Modal, Box, Typography, LinearProgress } from "@mui/material";

function EmotionModal({ open, onClose, emotionsData }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          backgroundColor: "white",
          border: "2px solid #000",
          boxShadow: 24,
          left:"40%",
          top:"40%",
          p: 4,
        }}
      >
        {emotionsData ? (
          <div>
            <Typography variant="h5">Detected Emotions</Typography>
            {Object.entries(emotionsData).map(([emotion, score]) => (
              <div key={emotion}>
                {emotion}: {score}
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(score) * 10}
                />
              </div>
            ))}
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
