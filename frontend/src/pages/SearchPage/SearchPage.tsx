import { useContext, useState, useEffect } from "react";
import OnlineUser from "./components/OnlineUser";
import NavBar from "../../common/components/NavBar/NavBar";
import { OriInfo } from "../RegisterPage/components/InputForm";
import { AuthContext } from "../../common/context/AuthContext";
import { SearchService } from "./services/SearchService";
import { SearchListType } from "./types/SearchListType";
import { ChatContext } from "../../common/context/ChatContext";
import { ChatContextType } from "../../common/types/ChatContextType";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const user: OriInfo = useContext(AuthContext);
  const chat: ChatContextType = useContext(ChatContext);
  const [state, setState] = useState("group");
  const [onlineUsers, setOnlineUsers] = useState<SearchListType[]>([]);
  const navigate = useNavigate();

  const whisperList = function (onlineUsers) {
    if (!onlineUsers) return [];
    // const onlineUsersArray = Array.from(onlineUsersMap.values());
    // console.log("online users:", onlineUsers);
    const onlineusers = onlineUsers.map((us) => {
      return {
        chat_id: us.user_id,
        chat_name: `${us.username}${us.user_id == user.user_id ? " (me)" : ""}`,
        members: 2,
        profile_picture: us.profile_picture,
      };
    });
    return onlineusers;
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await SearchService.getAllGroups();
      const groupList: SearchListType[] = groups.map((group) => {
        return {
          chat_id: group._id,
          chat_name: group.group_name,
          members: group.participants.length,
          profile_picture: group.group_picture,
        };
      });
      setOnlineUsers(groupList);
    };

    if (state === "group") {
      fetchGroups();
    } else if (state === "whisper") {
      const whisper = whisperList(chat.onlineUsers);
      setOnlineUsers(whisper);
    }
  }, [state]);

  const joinGroupChat = async (chat_id: string) => {
    await SearchService.joinGroupChat(chat_id, user.user_id);
  };

  return (
    <>
      <main className="w-full min-h-[100vh] bg-cpc-blue">
        <NavBar menuFocus={"search"} user={user} />
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
            {onlineUsers.map((onlineuser, index) => {
              return (
                <OnlineUser
                  key={index}
                  is_group={state === "group"}
                  chat_name={onlineuser.chat_name}
                  members={onlineuser.members}
                  profile_picture={onlineuser.profile_picture}
                  onClick={async () => {
                    if (state === "group") {
                      chat.updateSelectedChat(onlineuser.chat_id);
                      if (state === "group")
                        await joinGroupChat(onlineuser.chat_id);
                      navigate("/chat");
                    } else {
                      if (user.user_id == onlineuser.chat_id) return;
                      const chat_id = await SearchService.getChatId(
                        user.user_id,
                        onlineuser.chat_id
                      );
                      chat.updateSelectedChat(chat_id);
                      navigate("/chat");
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
