import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ScoreCircle from './Scorecircle'
import { usePuterStore } from '~/lib/puter';

const Resume_cards = ({ companyName, jobTitle, imagePath, resumePath, feedback, id }: Resume) => {
    const { fs } = usePuterStore();
    const [resumeURL, setResumeURL] = useState<string | null>(null);
    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath)
            if (!blob) return;

            let url = URL.createObjectURL(blob);
            setResumeURL(url);

        }
        loadResume();
    }, [imagePath])

    return (
        <Link to={`/resume/${id}`} className='resume-card h-[560px] w-[350px] animate-in max-md:w-full  lg:w-[430px] xl:w-[400px] fade-in duration-1000'>
            <div className="resume-card-header   max-md:items-center">

                <div className="flex flex-col gap-2">
                    {companyName && <h2 className='!text-black font-bold break-words'>{companyName}</h2>}
                    {jobTitle && <h3 className='text-lg text-gray-500 break-words'>{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className='text-black font-bold'>
                        Resume
                    </h2>}
                </div>

                <div className="flex-shrink-0 ">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeURL &&(
                <div className="gradient-border animate-in fade-in duration-1000 ">
                    <div className="w-full h-full">
                        <img src={resumeURL} alt="resume" className='w-full h-[350px]  object-cover object-top' />
                    </div>
                </div>
            )
            }
        </Link>
    )
}

export default Resume_cards