import Image from "next/image";
import Hero from "./components/landingPage/Hero";
import UnlockTabs from "./components/landingPage/Tabs";
import MasterArt from "./components/common/MasterArt";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
export default function Home() {
  return (
    <>
    <Header/>
      <Hero />
    <div className="background">
      <UnlockTabs
        span=""
        title="Supercharge Your Interview Skills"
        subTitle="Unlock Opportunities"
      />
      <div className=" bg-gray-700 h-[400px]">
        <div className="  mx-auto container 2xl:max-w-container xl:px-[128px]">
          <div className="flex pt-24 items-center justify-center">
            <MasterArt
              className="max-w-[700px]"
              className2="text-white text-3xl font-bold text-center"
              className3="text-white pt-5 text-center"
              btnstyle="mx-auto"
              title="Master The Art Of Interviewing"
              discription="Uncover your strengths and refine your weaknesses in real-time. Our AI-powered feedback offers personalized suggestions to help you articulate your thoughts confidently and persuasively."
              btnText="Try Devsort Free"
            />
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
}
