import Image from "next/image";
import Hero from "./components/landingPage/Hero";
import UnlockTabs from "./components/landingPage/Tabs";
import Link from "next/link";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
export default function Home() {
  return (
    <>
    <Header/>
      <Hero />
    <div className="">
      <UnlockTabs
        span=""
        title="Supercharge Your Interview Skills"
        subTitle="Unlock Opportunities"
      />
      <div className="layout opacity-[0.9] h-[400px]">
        <div className="  mx-auto container 2xl:max-w-container xl:px-[128px]">
          <div className="flex py-16 items-center justify-center">
          <div className=" max-w-[900px]  ">
            <h1 className="  text-white font-bold text-[39px] text-center pb-5">Practice The Art Of Interviewing</h1>
            <p className="text-white text-[19px]  text-center text-center py-4 ">
            Uncover your strengths and refine your weaknesses in real-time. Our AI-powered feedback offers personalized suggestions to help you articulate your thoughts confidently and persuasively.
            </p>
            
            <div className="  mt-5 flex justify-center mx-auto">
              <Link href="/login">
             <button className=" layout border border-white py-4 font-bold px-14 text-white rounded-full">Try Our Service</button>
             </Link>
            </div>
            
         </div>
         </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
}
