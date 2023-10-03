import React from "react";
import { Modal, Box, Typography, LinearProgress } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function EmotionModal({ open, onClose, emotionsData, gazeData }) {
  return (
    <div className="mt-[100px] ">
      <Modal
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          justifyItems: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={onClose}
      >
        <Box
          sx={{
            width: "400px",
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            margin: "auto",
            p: 4,
            borderRadius: "5px",
          }}
        >
          {/* {emotionsData ? (
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
              <Typography variant="h5">Loading ...</Typography>
              <LinearProgress />
            </div>
          )} */}

          {gazeData ? (
            <div className=" p-3 mt-8">
              <Typography
                style={{ fontWeight: "bold", textAlign: "center" }}
                variant="h5"
              >
                Emotions
              </Typography>
              <div className="gaze-container ">
                <div className="gaze-item">
                  <div
                    style={{ width: 200, height: 200 ,  margin: "auto"}}
                    className="circular-progress "
                  >
                    <CircularProgressbar
                      value={parseFloat(gazeData["Eye Blinking"])}
                      text={`${gazeData["Eye Blinking"]}%`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Typography variant="h5">Loading ...</Typography>
              <LinearProgress />
            </div>
          )}
          
          {gazeData && (
            <div className=" p-3 mt-8">
              <Typography
                style={{ fontWeight: "bold", textAlign: "center" }}
                variant="h5"
              >
                Gaze 
              </Typography>
              <div className="gaze-container ">
                <div className="gaze-item">
                  <div
                    style={{ width: 200, height: 200 , margin: "auto" ,}}
                    className="circular-progress "
                  >
                    <CircularProgressbar
                      value={parseFloat(gazeData["Eye Blinking"])}
                      text={`${gazeData["Eye Blinking"]}%`}
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
