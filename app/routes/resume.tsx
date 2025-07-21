import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Summary from '~/components/Summary'
import { usePuterStore } from '~/lib/puter'
export const meta = () => ([
    {
        title: "Resume ATS | Review",
    },
    {
        name: "description",
        content: "Review your resume with AI-powered feedback"
    }
])


const resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();

    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    const navigate = useNavigate();

    
    useEffect(() => {
      if(!isLoading && !auth.isAuthenticated) {
        navigate(`/auth?next=/resume/${id}`)
      }
    }, [isLoading, auth.isAuthenticated ])

    useEffect(() => {
        const Loadresume = async () => {
            const resume = await kv.get(`resume:${id}`);
            if (!resume) {
                return;
            }

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) {
                return;
            }
            const PdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeURL = URL.createObjectURL(PdfBlob);
            setResumeUrl(resumeURL);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) {
                return;
            }
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({ resumeUrl, imageUrl, feedback: data.feedback });

        }

        Loadresume();
    }, [id])
    return (
        <main className='pt-0 mt-0'>
            <nav className='resume-nav'>
                <Link to="/" className='back-button'>
                    <img src="/icons/back.svg" alt="back" className='w-2.5 h-2.5' />
                    <span className='text-gray-800 font-semibold text-sm'>Back to Home</span>
                </Link>
            </nav>
            <div className="flex w-full flex-row max-lg:flex-col-reverse">
                <section className='feedback-section bg-[url("/images/bg-small.svg")] bg-cover h-[100vh] sticky top-0  items-center  '>
                    {
                        imageUrl && resumeUrl && (
                            <div className='fade-in animate-in duration-1000 gradient-border  max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit '>
                                <a href={resumeUrl} target="_blank" className='cursor-pointer' rel="noopener noreferrer">
                                    <img src={imageUrl} alt="" className='w-full h-full object-contain rounded-2xl' />
                                </a>
                            </div>
                        )
                    }

                </section>

                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-semibold">
                      Resume  Review
                    </h2>

                    {
                        feedback ? (
                            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                                {/* <Summary feedback={feedback} />
                                <ATS score={feedback.ATS.score || 0} suggesions={feedback.ATS.tips || []} />
                                <Details feedback={feedback} /> */}
                            </div>
                        ):(
                            <img src="/images/resume-scan-2.gif" alt="searching" className='w-full h-full' />
                        )
                    }
                    
                </section>
            </div>
        </main>
    )
}

export default resume