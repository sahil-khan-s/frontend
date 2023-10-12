"use client";
import React from "react";
import PracticeNow from "../common/PracticeNow";
import InterviewCards from "./interview";
const page = () => {
  return (
    <div className="container templates mx-auto container 2xl:max-w-container xl:px-[128px] ">
      <div className="px-8]">
        <div className="">
          <h1 className="pt-10 text-3xl text-start font-bold ">Templates</h1>
          <div className="mt-16 w-[630px] mx-auto">
            <PracticeNow />
          </div>
          <div className="pt-14">
            <div className="mb-12 w-[300px] mx-auto"></div>
            <div>
              <div>
                <InterviewCards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default page;
