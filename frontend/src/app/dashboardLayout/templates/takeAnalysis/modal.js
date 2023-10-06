import React from "react";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function EmotionModal({ open, onClose, emotionsData, gazeData }) {
  return (
    <div className="mt-12">
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
            width: "600px",
            minHeight: "200px",
            minwidth: "200px",
            backgroundColor: "#f0f0f0",
            border: "2px solid #000",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
        >
          {emotionsData ? (
            <div className="p-4 mt-6 border-b-2 border-gray-200">
              <Typography
                style={{ fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
                variant="h5"
              >
                Emotions
              </Typography>
              <div className="gaze-container">
                <div className="gaze-item">
                  <div
                    style={{ width: 200, height: 200, margin: "auto" }}
                    className="circular-progress"
                  >
                    <CircularProgressbar
                      value={parseFloat(emotionsData["emotion_score"])}
                      text={`${emotionsData["emotion_score"]}%`}
                      styles={buildStyles({
                        textColor: "red",
                        pathColor: "red",
                        trailColor: "gold",
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 mt-6 text-center">
              <Typography variant="h5">Loading</Typography>
              <CircularProgress />
            </div>
          )}

          {gazeData && (
            <div className="p-4 mt-6">
              <Typography
                style={{ fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
                variant="h5"
              >
                Gaze
              </Typography>
              <div className="gaze-container">
                <div className="gaze-item">
                  <div
                    style={{ width: 200, height: 200, margin: "auto" }}
                    className="circular-progress"
                  >
                    <CircularProgressbar
                      value={parseFloat(gazeData["Score"])}
                      text={`${gazeData["Score"]}%`}
                      styles={buildStyles({
                        textColor: "red",
                        pathColor: "blue",
                        trailColor: "gold",
                      })}
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
