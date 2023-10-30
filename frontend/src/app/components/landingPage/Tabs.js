"use client";
import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import videoTab from "../../../../public/assets/images/videoTab.png"
function UnlockTabs({ span, title, subTitle }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="modal">
      
      <div className="py-9">
        <h1 className="pb-5 text-center text-2xl text-white font-bold">{title}</h1>
        <p className="text-center text-xl font-medium text-white">{subTitle}</p>
      </div>
<div>
<Box sx={{ typography: "body1" , display:"flex" , flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab style={{color:"white"}}   label="Video" value="1" />
              <Tab style={{color:"white"}}  label="Audio" value="2" />
              <Tab style={{color:"white"}}  label="Question Generator" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
           <div className="flex justify-between pb-8 ">
            <div className="max-w-[500px] pt-10">
            <h1 className=" py-2 text-2xl font-bold text-white">Unleash Nonverbal Excellence with Video Analysis</h1>
            <p className="text-[19px] text-white">Pluoo AI introduces Video Analysis—a game-changer in interview preparation. Our cutting-edge technology evaluates your body language, facial expressions, and overall presentation, providing personalized feedback to refine your nonverbal communication. Master nonverbal cues, exude confidence, and leave a lasting impression. Elevate your interview skills with Pluoo AI today.</p>
            </div>
            <div><Image src={videoTab} alt="" width={700} height={500}/></div>
            
           </div>

          </TabPanel>
          <TabPanel style={{color:"white"}}  value="2">Audio</TabPanel>
          <TabPanel style={{color:"white"}}  value="3">Question Generator</TabPanel>
        </TabContext>
      </Box>
</div>
  
    </div>
  );
}

export default UnlockTabs;
