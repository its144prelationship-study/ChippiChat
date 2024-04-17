import { useState } from "react";
import OnlineUser from "./components/OnlineUser";
import NavBar from "../../common/components/NavBar/NavBar";
export default function SearchPage() {
  const [state, setState] = useState("whisper");
  const onlineUsers = [
    {
      chat_name: "PedPed",
      members: 2,
      profile_picture: "1",
    },
    {
      chat_name: "BaanNeeMeerakkkk",
      members: 5,
      profile_picture: "11",
    },
    {
      chat_name: "PedPed",
      members: 2,
      profile_picture: "2",
    },
    {
      chat_name: "BaanNeeMeerak",
      members: 5,
      profile_picture: "12",
    },
    {
      chat_name: "PedPed",
      members: 2,
      profile_picture: "3",
    },
    {
      chat_name: "BaanNeeMeerak",
      members: 5,
      profile_picture: "13",
    },
    {
      chat_name: "PedPed",
      members: 2,
      profile_picture: "4",
    },
    {
      chat_name: "BaanNeeMeerak",
      members: 5,
      profile_picture: "14",
    },
  ];

  return (
    <>
      <NavBar menuFocus={"search"} username={"Chippi Chappa"} />
      <main className="w-full min-h-[100vh] bg-cpc-blue">
        <div className="h-full flex justify-center items-center flex-col py-5">
          <h1 className="font-dm-mono font-normal text-4xl text-white [text-shadow:0px_4px_4px_var(--tw-shadow-color)] shadow-black/25">
            Welcome ‘Chippi chappa’
          </h1>
          <p className="font-dm-mono font-light text-xl text-white [text-shadow:0px_4px_4px_var(--tw-shadow-color)] shadow-black/25 my-2">
            Find your friend and chat to get closer !
          </p>
          <div className="min-w-[200px] w-3/5 h-1 bg-white/35 my-3" />
          <span className="w-3/5 flex flex-row justify-evenly items-center mb-8">
            <p
              className={`w-2/5 flex place-content-center font-dm-mono text-2xl ${
                state === "whisper"
                  ? "font-medium text-cpc-orange"
                  : "font-light text-white"
              } [text-shadow:0px_4px_4px_var(--tw-shadow-color)] shadow-black/25 hover:scale-[105%] hover:[text-shadow:5px_5px_10px_var(--tw-shadow-color)] duration-300 ease-in-out cursor-pointer`}
              onClick={() => setState("whisper")}
            >
              Whisper
            </p>
            <div className="w-1 h-10 bg-white shadow-md"></div>
            <p
              className={`w-2/5 flex place-content-center font-dm-mono text-2xl ${
                state === "group"
                  ? "font-medium text-cpc-orange"
                  : "font-light text-white"
              } [text-shadow:0px_4px_4px_var(--tw-shadow-color)] shadow-black/25 hover:scale-[105%] hover:[text-shadow:5px_5px_10px_var(--tw-shadow-color)] duration-300 ease-in-out cursor-pointer`}
              onClick={() => setState("group")}
            >
              Group
            </p>
          </span>
          <div className="w-3/5 grid grid-cols-3 justify-evenly justify-items-center items-center">
            {onlineUsers.map((user, index) => {
              return (
                <OnlineUser
                  key={index}
                  is_group={state === "group"}
                  chat_name={user.chat_name}
                  members={user.members}
                  profile_picture={user.profile_picture}
                  onClick={() => {}}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
