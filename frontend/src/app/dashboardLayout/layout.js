// components/CommonLayout.js
import React from "react";
import Sidebar from "./common/sidebar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <div className="flex  w-[100%] h-screen">
        <div className=" ">
          <Sidebar />
        </div>

        <div className=" w-[100%] ">
          {children}
          </div>

        </div>
      </body>
    </html>
  );
}
