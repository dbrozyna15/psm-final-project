import Image from 'next/image'
import {Jaldi} from 'next/font/google'
import {signInWithGoogle, logInWithEmailAndPassword, auth, logout} from '@/services/firebase'
import {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'


const jaldi = Jaldi({weight: '400', subsets: ['latin']});
export default function FirstPost() {
    logout()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) console.log("dupaxdd");
    }, [user, loading]);
    return (
        <main
            className={`mx-auto max-w-sm h-screen content-center flex flex-nowrap ${jaldi.className} box-border overflow-hidden`}>
            <div className="flex min-h-full w-full flex-wrap content-between bg-white">
                <div className="mt-11 flex h-2/5 w-full flex-col flex-wrap content-center text-black">
                    <div className="mb-5 h-3/4 logo">
                        <Image src="/logo.png" alt="Dice Master Logo" width={256} height={256}/>
                    </div>
                    <div className="text-5xl app-name">
                        DICE MASTER
                    </div>
                </div>
                <div className="w-full px-8 message-bar" style={{height: "6%"}}>
                    <div className="border-red-500 min-h-full px-3 border rounded
                    text-red-500 hover:text-white hover:bg-red-500 w-full flex
                    flex-wrap justify-center content-center">
                        WARNING: Wrong e-mail or password.
                    </div>
                </div>
                <form className="h-3/5 w-full rounded bg-white px-8 pt-6 pb-8">
                    <div className="mb-4">
                        <label className="mb-2 block text-xl font-bold text-gray-700" htmlFor="username">
                            E-mail
                        </label>
                        <input
                            className="w-full appearance-none rounded border px-3 py-2 text-xl leading-tight text-black shadow focus:shadow-outline focus:outline-none"
                            id="userEmail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="placeholder@email.com"/>
                    </div>
                    <div className="mb-6">
                        <label className="mb-2 block text-xl font-bold text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="mb-3 w-full appearance-none rounded border px-3 py-2 text-xl leading-tight text-black shadow focus:shadow-outline focus:outline-none"
                            id="userPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border
                            text-xl font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-7/12 mr-2"
                            type="button"
                            onClick={signInWithGoogle}
                        >
                            Google Sign In
                        </button>
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border text-xl
                            font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-5/12 ml-2"
                            type="button"
                            onClick={() => logInWithEmailAndPassword(email, password)}>
                            Sign In
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-around">
                        <button
                            className="bg-black hover:bg-white text-white
                            hover:text-black hover:border-black border text-xl
                            font-bold py-2 px-4 rounded focus:outline-none
                            focus:shadow-outline w-full"
                            type="button">
                            Don't have account? Sign up
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}