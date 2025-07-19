import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import { resumes } from "const";
import Resume_cards from "~/components/Resume_cards";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resume ATS" },
    { name: "description", content: "Welcome to Resume ATS! check your Resueme ATS with This Ai " },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
      <section className="main-section md:mx-15 mx-2">
      <div className="page-heading max-sm:gap-4 gap-8 min-h-[80px]">
        <h1>Track  Your application & Resume ATS</h1>
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
