import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter"


export const meta = () => ([
    {
        title: "Resume ATS | auth",
    },
    {
        name: "description",
        content: "Log in to your account"
    }
])
const auth = () => {
    const {isLoading , auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1];
    const navigate = useNavigate();
    useEffect(() => {
      if(auth.isAuthenticated) {
        navigate(next || "/");
      }
    }, [auth.isAuthenticated,next])
    
    return (
        <main className=" pt-10 bg-[url('/images/bg-main.svg')] min-h-screen flex justify-center items-center bg-cover">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col rounded-2xl gap-8 bg-white p-10">
                    <div className="flex flex-col items-center text-center gap-2">
                        <h1 className=" xl:tracking-[-2px] max-sm:text-[3rem] ">Welcome</h1>
                        <h2>Log in to continue your Job Journey</h2>
                    </div>
                    {isLoading?(
                        <button className="auth-button animate-pulse">
                            <p>Singing You in ....</p>
                        </button> ): (
                            <>
                            {auth.isAuthenticated ? (
                                <button className="auth-button" onClick={auth.signOut}>
                                    <p>Sign Out</p>
                                </button>
                            ) : (
                                <button className="auth-button" onClick={auth.signIn}>
                                    <p>Log In</p>
                                </button> 
                            )}
                            </>
                        )}
                </section>
            </div>
        </main>
    )
}

export default auth