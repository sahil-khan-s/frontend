// components/CommonLayout.js
import React from 'react';
import Sidebar from './page';
const CommonLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' , justifyContent:"center", height:"100%" , width:"100%", gap:"0px",}}>
        <Sidebar />
      <main>{children}</main>
      
    </div>
  );
};

export default CommonLayout;