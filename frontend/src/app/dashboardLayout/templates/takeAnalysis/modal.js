import React from "react";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function EmotionModal({ open, onClose, emotionsData, gazeData }) {
  return (
    <div className="mt-[100px] ">
      <Modal className="gradient"
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
          className="gradient"
          sx={{
            width: "600px",
            minHeight:"200px",
            backgroundColor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            margin: "auto",
            p: 4,
            borderRadius: "5px",
          }}
        >
          {emotionsData ? (
            <div className="p-3 mt-8">
              <Typography
                style={{ fontWeight: "bold", textAlign: "center" }}
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
                      text={`${parseFloat(emotionsData["emotion_score"])}%`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Typography variant="h5">Loading</Typography>
              <CircularProgress />
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
                    style={{ width: 200, height: 200, margin: "auto" }}
                    className="circular-progress "
                  >
                    <CircularProgressbar
                      value={parseFloat(gazeData["Score"])}
                      text={`${gazeData["Score"]}%`}
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
