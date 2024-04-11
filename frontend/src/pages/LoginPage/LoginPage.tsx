import { useState, useEffect } from "react";

export default function LoginPage() {
    const [valid, setValid] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log("Username: ", username);
        console.log("Password: ", password);
    }, [valid, username, password]);

    return (
        <div>
            <div className="bg-cpc-blue w-screen h-screen px-12 py-20 flex flex-row gap-10 font-dm-mono">
                <div className="flex flex-col gap-2">
                    <img src="../chat-bubble.svg" className="w-[0.62] ml-auto -mr-5 -mb-6" />
                    <div className="font-normal text-9xl text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-12">ChippiChat</div>
                    <div className="bg-gradient-to-r from-white to-black/0 w-full h-1 my-4"></div>
                    <div className="font-normal text-[1.75rem] text-white ml-2">Login to start a conversation . . .</div>
                </div>
                <div className="bg-cpc-light-gray/[0.9] w-full h-auto rounded-xl flex flex-col items-center my-14 p-10 drop-shadow-[4px_4px_5px_rgba(0,0,0,0.25)]">
                    <div className="font-light text-9xl text-black">LOGIN</div>
                    <div className="h-7 font-normal text-xl text-cpc-red my-3">{valid ? "" : "Incorrect username or password !"}</div>
                    <div className="flex flex-col gap-12 mt-2">
                        <div className="font-light h-[5.5rem]">
                            <span className="text-3xl text-black">Username:</span>
                            <input className={`w-[22rem] rounded-xl ml-3 pl-3 py-7 text-2xl items-center placeholder-[#B0B0B0] ${valid ? 'bg-cpc-gray' : 'bg-[#FF9F9F]'} inner-shadow-4`}
                                type="text"
                                placeholder="Enter Your Username"
                                spellCheck="false"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="font-light h-[5.5rem]">
                            <span className="text-3xl text-black">Password:</span>
                            <input className={`w-[22rem] rounded-xl ml-3 pl-3 py-7 text-2xl items-center placeholder-[#B0B0B0] ${valid ? 'bg-cpc-gray' : 'bg-[#FF9F9F]'} inner-shadow-4`}
                                type="password"
                                placeholder="Enter Your Password"
                                spellCheck="false"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 mt-20">
                        <span className="font-normal text-xl text-cpc-blue">Don't have an account yet ?<br /><u>SIGN IN</u></span>
                        <div className="flex items-center bg-cpc-green border rounded-xl border-2 border-black px-11 py-1 text-2xl font-medium" onClick={() => setValid(!valid)}>LOG IN</div>
                    </div>
                </div>
            </div>
        </div>
    );
}