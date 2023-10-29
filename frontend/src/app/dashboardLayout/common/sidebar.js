"use client";
import React, { useState } from "react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import HistoryIcon from "@mui/icons-material/History";
import FolderIcon from "@mui/icons-material/Folder";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import logo from "../../../../public/assets/images/devlogo.png";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
const Sidebar = () => {
  const [open, setOpen] = useState(true); // Initially, show text + icons

  const toggleSidebar = () => {
    setOpen(!open);
  };
  
  const handleNavigation = () => {
    router.push('/dashboardLayout/dashboard'); // Provide the relative path to the page
  };

  return (
    <>
    <div className="">
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      classes={{
        paper: "custom-drawer-paper", // Add your custom class name here
      }}

      sx={{
        width: open ? "270px" : "72px", // Adjust the width as needed
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? "270px" : "72px", // Adjust the width as needed
        },
        
      }}

    >
      <div className="">
        <div className="flex px-2 items-center gap-2  mt-4 ">
          {open ? (
            <div>
              <div className="flex space-x-2 items-center cursor-pointer">
                <Image src={logo} alt="" width={50} height={50} />
                <Typography variant="body1" sx={{ fontWeight: "bold" , }}>
                  AI Buddy
                </Typography>
              </div>
            </div>
          ) : null}

          <div className="">
            <IconButton onClick={toggleSidebar} sx={{}}>
              <MenuIcon fontSize="large" />
            </IconButton>
          </div>
        </div>

        <Link href="/dashboardLayout">
          <h1 className="hover:bg-blue-300 ">
            {open ? (
              <>
                <div className="flex space-x-4 mt-10 px-10 py-5 items-center">
                  <DashboardIcon fontSize="large" />
                  <Typography variant="body1">Dashboard</Typography>
                </div>
              </>
            ) : (
              <div className="px-4 mt-10  py-5">
                <DashboardIcon fontSize="large" />
              </div>
            )}
          </h1>
        </Link>
        <Link href="/dashboardLayout/templates">
          <h1 >
            {open ? (
              <>
                <div className="flex space-x-4 px-10 hover:bg-blue-300   py-5 items-center">
                  <ListIcon fontSize="large" />
                  <Typography variant="body1">Templates</Typography>
                </div>
              </>
            ) : (
              <div className="px-4 py-5">
                <ListIcon fontSize="large" />
              </div>
            )}
          </h1>
        </Link>

        <Link href="/dashboardLayout/history">
          <h1>
            {open ? (
              <>
                <div className="flex space-x-4  px-10 hover:bg-blue-300 py-5 items-center">
                  <HistoryIcon fontSize="large" />
                  <Typography variant="body1">History</Typography>
                </div>
              </>
            ) : (
              <div className="px-4 py-5">
                <HistoryIcon fontSize="large" />
              </div>
            )}
          </h1>
        </Link>
        <Link href="/dashboardLayout/resources">
          <h1>
            {open ? (
              <>
                <div className="flex space-x-4 px-10 hover:bg-blue-300  py-5 items-center">
                  <FolderIcon fontSize="large" />
                  <Typography variant="body1">Resources</Typography>
                </div>
              </>
            ) : (
              <div className="px-4 py-5">
                <FolderIcon fontSize="large" />
              </div>
            )}
          </h1>
        </Link>
      </div>
      <Link href="/dashboardLayout/support">
        <div className="absolute bottom-2 px-4 gap-2 flex items-center">
          {open ? (
            <>
              <HelpRoundedIcon fontSize="large" />
              <h1 className=" font-medium">Support</h1>
            </>
          ) : (
            <HelpRoundedIcon fontSize="large" />
          )}
        </div>
      </Link>
    </Drawer>
    </div>
 
    </>
    
  );
};

export default Sidebar;
