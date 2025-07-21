import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import Resume_cards from "~/components/Resume_cards";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import { Link } from "react-router";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resume ATS" },
    { name: "description", content: "Welcome to Resume ATS! check your Resueme ATS with This Ai " },
  ];
}

export default function Home() {
  const {  auth,  kv } = usePuterStore();
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume[]>([]);

  const [LoadingResumes, setLoadingResumes] = useState(false)

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/")
    }
  }, [auth.isAuthenticated])

  useEffect (
    () => { 
      const Load_resumes = async () => { 
        setLoadingResumes(true)

        const resumes = (await kv.list("resume:*",   true)) as KVItem[]
        
        const Pastresumes = resumes?.map((res)=>(
          JSON.parse(res.value) as Resume 
        ))
        
        setResume(Pastresumes)
        setLoadingResumes(false)
       }
       Load_resumes()
      //  console.log(resume);
       
     },[]  )



  return <main className=" pt-10 bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section md:mx-15 mx-2">
      <div className="page-heading max-sm:gap-4 gap-8 min-h-[80px]">
        <h1 className=" xl:tracking-[-2px] max-sm:text-[3rem] ">Track  Your application & Resume ATS</h1>
        {!LoadingResumes && resume?.length === 0 ? (
          <h2>No Resume found. Upload Your first to get feedback.</h2>
        ) : (
          <h2>Review Your Submissions with Ai powered Feedback</h2>
        )}

        {
        LoadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" alt="fetching.." className="w-200px" />
          </div>
        )
        }
      </div>
      {!LoadingResumes && resume.length > 0 && (
        <div className="flex flex-wrap max-md:px-6 max-sm:px-2  gap-6 items-start max-md:flex-col max-md:gap-4 max-md:items-center w-full max-w-[1850px] justify-evenly">

          {resume.map((Resume) => (

            <Resume_cards key={Resume.id} {...Resume} />

          ))}
        </div>
      )}

      {!LoadingResumes && resume.length === 0 && (
        <div className="flex justify-center  flex-col items-center mt-10 gap-4">
          <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
            Upload Resume
          </Link>
        </div>
      )}
    </section>
  </main>
}
