import React from "react";
import { Modal, Box, Typography, LinearProgress } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function EmotionModal({ open, onClose, emotionsData, gazeData }) {
  return (
    <div className="mt-[100px] ">
    <Modal style={{display:"grid" , gridTemplateColumns:"1fr", justifyItems:"center", alignItems:"center" , justifyContent:"center"}} open={open} onClose={onClose}>
      <Box
        sx={{
          width: 800,
          backgroundColor: "white",
          border: "2px solid #000",
          boxShadow: 24,
         margin: "auto",
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
          <div className="border-2 border-blue-600 rounded-xl p-3 mt-8">
            <Typography
              style={{ fontWeight: "bold", textAlign: "center" }}
              variant="h5"
            >
              Gaze Data
            </Typography>
            <div className="gaze-container ">
              <div className="gaze-item">
                <Typography style={{ fontWeight: "bold" }} variant="subtitle1">
                  Eye Blinking
                </Typography>
                <div className="circular-progress">
                  <CircularProgressbar
                    value={parseFloat(gazeData["Eye Blinking"])}
                    text={`${gazeData["Eye Blinking"]}%`}
                  />
                </div>
              </div>
              <div className="gaze-item">
                <Typography style={{ fontWeight: "bold" }} variant="subtitle1">
                  Looking right
                </Typography>
                <div className="circular-progress">
                  <CircularProgressbar
                    value={parseFloat(gazeData["Looking right"])}
                    text={`${gazeData["Looking right"]}%`}
                  />
                </div>
              </div>
              <div className="gaze-item">
                <Typography style={{ fontWeight: "bold" }} variant="subtitle1">
                  Looking left
                </Typography>
                <div className="circular-progress">
                  <CircularProgressbar
                    value={parseFloat(gazeData["Looking left"])}
                    text={`${gazeData["Looking left"]}%`}
                  />
                </div>
              </div>
              <div className="gaze-item">
                <Typography style={{ fontWeight: "bold" }} variant="subtitle1">
                  Looking center
                </Typography>
                <div className="circular-progress">
                  <CircularProgressbar
                    value={parseFloat(gazeData["Looking center"])}
                    text={`${gazeData["Looking center"]}%`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Modal>
    </div>
  );
}

export default EmotionModal;
