// components/CommonLayout.js
import React from 'react';
import Sidebar from './page';
import Drawer from '@mui/material/Drawer';

const CommonLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer variant="permanent">
        <Sidebar />
      </Drawer>
    </div>
  );
};

export default CommonLayout;
