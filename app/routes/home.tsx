import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import { resumes } from "const";
import Resume_cards from "~/components/Resume_cards";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resume ATS" },
    { name: "description", content: "Welcome to Resume ATS! check your Resueme ATS with This Ai " },
  ];
}

export default function Home() {
  const {isLoading , auth } = usePuterStore();

  const navigate = useNavigate();
  useEffect(() => {
    if(!auth.isAuthenticated) {
      navigate("/auth?next=/")
    }
  }, [auth.isAuthenticated ])
  

  return <main className=" pt-10 bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
      <section className="main-section md:mx-15 mx-2">
      <div className="page-heading max-sm:gap-4 gap-8 min-h-[80px]">
        <h1 className=" xl:tracking-[-2px] max-sm:text-[3rem] ">Track  Your application & Resume ATS</h1>
        <p>Review Your Submissions with Ai powered Feedback</p>
      </div>
    {resumes.length>0 && (
      <div className="flex flex-wrap max-md:px-6 max-sm:px-2  gap-6 items-start max-md:flex-col max-md:gap-4 max-md:items-center w-full max-w-[1850px] justify-evenly">

        {resumes.map((Resume) => (
          
          <Resume_cards key={Resume.id} {...Resume} />
          
        ))}
    </div>
    )}
    </section>
  </main>
}
