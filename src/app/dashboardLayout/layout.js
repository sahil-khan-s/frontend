// components/CommonLayout.js
import React from 'react';
import Sidebar from './page';
const CommonLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
        <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
