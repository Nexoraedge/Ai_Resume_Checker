import React, { useState, type FormEvent } from 'react'
import FileUploader from '~/components/Fileuploader';
import Navbar from '~/components/Navbar'
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from '~/lib/pdfToImage';
import { generateUUID } from '~/lib/util';
import { prepareInstructions } from 'const';


const upload = () => {
    const {isLoading , auth , fs , ai  , kv}= usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setisProcessing] = useState(false);
    const [StatusText, setStatusText] = useState("");

    const handleAnalyze = async ({company_name ,job_title ,job_description, File}: {company_name: string, job_title: string, job_description: string, File: File}) => {
        setisProcessing(true);
        setStatusText('Uploading your resume...');
        const uploadFile = await fs.upload([File])
        if(!uploadFile) {
            return setStatusText('Error: Failed to upload resume');
        }
        setStatusText('Converting to Image....');
        const imageFile = await convertPdfToImage(File);

        if(!imageFile){
           return setStatusText('Failed to convert PDF to Image')
        }
        const {file} = imageFile;
        
        if (!file) {
            return setStatusText('Error: No file generated from PDF conversion')
        }
        
        setStatusText('Uploading the image...');
        const uploadImage  = await fs.upload([file]);
        if(!uploadImage){
            return    setStatusText('Error: Failed to upload image')
        }
        setStatusText('Preparing Data...');
        const uuid = generateUUID()
        const data = {
            id:uuid,
            company_name,
            job_title,
            job_description,
            resumePath:uploadFile.path,
            imagePath:uploadImage.path,
            feedback:"",
        }
        await kv.set(`resume:${uuid}` , JSON.stringify(data))
        setStatusText('Analyzing your resume...');
       
        // navigate(`/resume/${uuid}`)
        const feedback = await ai.feedback(
            uploadFile.path,
            prepareInstructions({jobTitle:job_title ,jobDescription:job_description })
        )
        if(!feedback){
            setStatusText('Error: Failed to analyize your Resume')
            
            return;
        }

        const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}` , JSON.stringify(data))
        setStatusText('Analysis completed. Redirecting...');
         console.log(data);
         navigate(`/resume/${uuid}`)


    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        const form = e.currentTarget.closest('form')
        if(!form) return;
        const formData = new FormData(form)
        const company_name = formData.get('company-name') as string;
        const job_title = formData.get('job-title') as string;
        const job_description = formData.get('job-description') as string;
        // console.log(company_name, job_title, job_description , File);
        if(!File ) return;
        handleAnalyze({company_name ,job_title ,job_description, File})
    }

    const [File, setFile] = useState<File | null>(null)

    const handleFIleAccept = (file: File | null) => {
        setFile(file)
    }
    return (

        <main className='bg-[url("/images/bg-main.svg")] max-md:px-4 max-sm:px-2 bg-cover pt-10'>
            <Navbar  />
            <section className='main-section md:mx-15  mx-8'>
                <div className="page-heading">
                    <h1 className=" xl:tracking-[-2px]  ">
                        Smart Feedback for your dream Job
                    </h1>
                    {isProcessing ? (
                        <>
                            <h2 className="mt-5">
                                {StatusText}
                            </h2>
                            <img src="/images/resume-scan.gif" alt="is processing" className='w-full mx-auto' />
                        </>
                    ) : (
                        <h2 className="mt-5">Drop your resume for an ATS Score and improvements tips</h2>
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