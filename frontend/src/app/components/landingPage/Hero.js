import React from "react";
import Image from "next/image";
import Interview from "../../../../public/assets/images/interview.jpg";
import MasterArt from "@/app/components/common/MasterArt"
function Hero() {
  return (
    <div className="bg-gray-700 lg:h-[500px]">
      <div className="  mx-auto container 2xl:max-w-container xl:px-[128px]">
        <div className="flex lg:flex-row flex-col  pt-24 items-center justify-between">
          <MasterArt 
          className="max-w-[500px]"
          className2="text-white text-3xl font-bold"
          className3="text-white pt-5"
          title = "Master The Art Of Interviewing"
          discription = "Your Personal Interview Coach: Transforming Interviews, Empowering Careers"
          btnText ="Try Devsort Free"
          />
          <div className="py-5 lg:py-0">
            <Image
              src={Interview}
              alt="Logo"
              width={500}
              height={500}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
