"use client";
import React from "react";
import PracticeNow from "../common/PracticeNow";
import InterviewCards from "./interview";
const page = () => {
  return (
    <div className=" ">
        <div className="">
          <h1 className="pt-10 text-3xl text-center font-bold ">Templates</h1>
          <div className="mt-16 w-[620px] mx-auto">
            <PracticeNow />
          </div>
        </div>
      <div className="px-8">

        <div className="pt-10">
          <InterviewCards />
        </div>
      </div>
    </div>
  );
};

export default page;
