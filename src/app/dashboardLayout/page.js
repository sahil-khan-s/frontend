"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import HistoryIcon from '@mui/icons-material/History';
import FolderIcon from '@mui/icons-material/Folder';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

const Sidebar = () => {
  const [open, setOpen] = useState(true); // Initially, show text + icons

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        width: open ? '240px' : '72px', // Adjust the width as needed
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? '240px' : '72px', // Adjust the width as needed
        },
      }}
    >
      <div>
        <IconButton
          onClick={toggleSidebar}
          sx={{ position: 'absolute', right: '0', top: '0' }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/dashboardLayout/dashboard">
          <h1>
            {open ? (
              <>
                <DashboardIcon fontSize="large" />
                <Typography variant="body1">Dashboard</Typography>
              </>
            ) : (
              <DashboardIcon fontSize="large" />
            )}
          </h1>
        </Link>
        <Link href="/dashboardLayout/templates">
          <h1>
            {open ? (
              <>
                <ListIcon fontSize="large" />
                <Typography variant="body1">Templates</Typography>
              </>
            ) : (
              <ListIcon fontSize="large" />
            )}
          </h1>
        </Link>
        <Link href="/dashboardLayout/history">
          <h1>
            {open ? (
              <>
                <HistoryIcon fontSize="large" />
                <Typography variant="body1">History</Typography>
              </>
            ) : (
              <HistoryIcon fontSize="large" />
            )}
          </h1>
        </Link>
        <Link href="/dashboardLayout/resources">
          <h1>
            {open ? (
              <>
                <FolderIcon fontSize="large" />
                <Typography variant="body1">Resources</Typography>
              </>
            ) : (
              <FolderIcon fontSize="large" />
            )}
          </h1>
        </Link>
      </div>
    </Drawer>
  );
};

export default Sidebar;
