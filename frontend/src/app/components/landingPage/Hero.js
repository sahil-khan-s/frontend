import React from "react";
import Image from "next/image";
import Interview from "../../../../public/assets/images/interview.jpg";
import MasterArt from "@/app/components/common/MasterArt";
function Hero() {
  return (
    <div className="gradient   pb-12">
      <div className="  mx-auto container 2xl:max-w-container  xl:px-[128px]">
        <div className="flex lg:flex-row flex-col  max-w-[1000px] mx-auto pt-12 items-center justify-center justify-between">
          
          <div>
          <MasterArt
            className=""
            className2="text-blue-800  rounded-tl-[40px] rounded-br-[40px] py-5 text-[40px] font-bold"
            className3="text-blue-800  pt-5"
            title="Elevate Your Interviews with Interview Buddy"
            discription=" Unlock the power of Interview Buddy, your trusted companion for
            interview preparation. Whether you're a job seeker aiming to
            land your dream role or a professional looking to sharpen your
            skills, our AI-driven platform is here to help you succeed."
            btnText="Try Our Service"
          />
          
          </div>
          <div className="py-5 lg:py-0">
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
