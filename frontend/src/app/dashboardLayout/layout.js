// components/CommonLayout.js
import React from "react";
import Sidebar from "./common/sidebar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" ">
        <div className="flex  w-[100%]  min-h-screen">
          <div className=" ">
            <Sidebar />
          </div>
          <div className="  w-[100%] sticky background-gradient">
            <div
              className=" w-[100%]   min-h-screen"
              style={{ height: "100%" }}
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
