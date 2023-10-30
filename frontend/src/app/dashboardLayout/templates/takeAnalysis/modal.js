import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function EmotionModal({ open, onClose, emotionsData, gazeData , validateResult }) {
  return (
    <div className="  ">
        
      <Modal
      className="custom-drawer-paper "
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
        open={open}
        onClose={onClose}
      >
       
        <Box
      
          sx={{
            display:"flex",
            flexDirection:"column",
          }}
        >
          <div className="flex flex-col items-center justify-center" >
        <div
            className=" text-white modal px-[128px] w-[100%] mx-auto py-5 text-[40px] font-bold border-2  border-white  "
          >
            Lorem ipsum dolor sit amet 
          </div >
          <p className=" text-white text-[18px] px-[128px] mt-5 py-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam reiciendis perferendis neque libero corporis rem magni illo esse, dolor doloremque iusto expedita pariatur. Eaque iste, dolorem cupiditate nulla cumque voluptatum!
          Cumque iure, accusamus expedita commodi voluptates, hic exercitationem ab similique tempora illo quia magnam mollitia, animi amet quidem. Doloribus vero vitae fugiat nostrum fuga ex, repudiandae laborum! Commodi, quasi eligendi!</p>
          </div>
          <div className="flex justify-center gap-[100px] items-center">
            <div className="px-4 pt-3 w-[340px] pb-10 mt-6 border-2  border-white  rounded-tl-[40px] rounded-br-[40px]">
              <Typography
                style={{ color:"white",fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
                variant="h5"
                className="modal text-center py-5 rounded-tl-[40px] rounded-br-[40px]"
              >
                Validated Result
              </Typography>
              <div className="gaze-container">
                <div className="gaze-item">
                  <div
                    style={{ width: 150, height: 150, margin: "auto" }}
                    className="circular-progress"
                  >
                    <CircularProgressbar
                      value={validateResult}
                      text={validateResult}
                      styles={buildStyles({
                        textColor: "white",
                        pathColor: "red",
                        trailColor: "gold",
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          {emotionsData && (
            <div className="px-4 pt-3 w-[340px] pb-10 mt-6 border-2  border-white  rounded-tl-[40px] rounded-br-[40px]">
              <Typography
                style={{ color:"white",fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
                variant="h5"
                className="modal text-center py-5 rounded-tl-[40px] rounded-br-[40px]"
              >
                Emotion Result
              </Typography>
              <div className="gaze-container">
                <div className="gaze-item">
                  <div
                    style={{ width: 150, height: 150, margin: "auto" }}
                    className="circular-progress"
                  >
                    <CircularProgressbar
                      value={parseFloat(emotionsData["emotion_score"])}
                      text={`${emotionsData["emotion_score"]}%`}
                      styles={buildStyles({
                        textColor: "white",
                        pathColor: "red",
                        trailColor: "gold",
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {gazeData && (
            <div className="px-4 pt-3 pb-10 min-w-[340px] mt-6 border-2 border-white  rounded-tl-[40px] rounded-br-[40px]">
              <Typography
                style={{ color:"white", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}
                variant="h5"
                className="modal text-center py-5 rounded-tl-[40px] rounded-br-[40px]"

              >
                Gaze Result
              </Typography>
              <div className="gaze-container">
                <div className="gaze-item">
                  <div
                    style={{  width: 150, height: 150,  margin: "auto" }}
                    className="circular-progress"
                  >
                    <CircularProgressbar
                      value={parseFloat(gazeData["Score"])}
                      text={`${gazeData["Score"]}%`}
                      styles={buildStyles({
                        textColor: "white",
                        pathColor: "red",
                        trailColor: "gold",
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
             <div className="px-[158px] mt-14">
          <button
                onClick={onClose}
                className={`modal px-12  hover:bg-green-700 text-white font-bold py-3 cursor-pointer  rounded-full`}
              >
                Go Back
              </button>
              </div>          
        </Box>
      </Modal>
    </div>
  );
}

export default EmotionModal;
