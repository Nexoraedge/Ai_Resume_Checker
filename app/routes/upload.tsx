import React, { useState, type FormEvent } from 'react'
import FileUploader from '~/components/Fileuploader';
import Navbar from '~/components/Navbar'

const upload = () => {
    const [isProcessing, setisProcessing] = useState(false)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        const form = e.currentTarget.closest('form')
        if(!form) return;
        const formData = new FormData(form)
        const company_name = formData.get('company-name')
        const job_title = formData.get('job-title')
        const job_description = formData.get('job-description')
        console.log(company_name, job_title, job_description , File);
        
    }
    const [File, setFile] = useState<File | null>(null)

    const handleFIleAccept = (file: File | null) => {
        setFile(file)

    }
    return (

        <main className='bg-[url("/images/bg-main.svg")] bg-cover'>
            <Navbar />
            <section className='main-section md:mx-15  mx-8'>
                <div className="page-heading py-16">
                    <h1>
                        Smart Feedback for your dream Job
                    </h1>
                    {isProcessing ? (
                        <>
                            <h2>
                                Scanning your resume...
                            </h2>
                            <img src="/images/resume-scan.gif" alt="is processing" className='w-full' />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS Score and improvements tips</h2>
                    )}
                    {
                        !isProcessing && (
                            <form id='upload-form' className='flex flex-col gap-4 mt-8 ' onSubmit={handleSubmit} action=" ">
                                <div className="form-div">
                                    <label htmlFor="company-name">Company Name</label>
                                    <input type="text" name='company-name' id='company-name' placeholder='Company Name' />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-title">Job title</label>
                                    <input type="text" name='job-title' id='job-title' placeholder='Job title' />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-description">Job description</label>
                                    <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" /> 
                                </div>
                                <div className="form-div">
                                    <label htmlFor="uploader">Upload Resume</label>
                                    <FileUploader onFileSelect={handleFIleAccept} />
                                </div>
                                <button className='primary-button' type='submit'>Analyze resume</button>
                            </form>
                        )
                    }
                </div>

            </section>
        </main>
    )
}

export default upload