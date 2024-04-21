import ChatListComponent from "./ChatListComponent";
import CreateGroupIcon from "../../../assets/create-group-icon.svg";
import Rings from "../../../assets/rings.svg";
import { ChatListType } from "../types/ChatListType";

export default function ChatLists({
  chatLists,
  setCreateGroup,
  selectedChat,
  setSelectedChat,
}: {
  chatLists: ChatListType[];
  setCreateGroup: (createGroup: boolean) => void;
  selectedChat: string;
  setSelectedChat: (selectedChat: string) => void;
}) {
  return (
    <div className="flex flex-row">
      <div className="w-[30rem] my-5 ml-16 mr-5 h-[40rem] bg-[#F7F7F7]/90 rounded-lg py-6 pl-6 pr-10 space-y-3 shadow-[4px_4px_5px_0px_rgba(0,0,0,0.3)] overflow-auto">
        {chatLists.map((chatList, index) => (
          <ChatListComponent
            key={index}
            chatter={chatList}
            is_selected={selectedChat === chatList.id}
            setSelectedChat={setSelectedChat}
          />
        ))}
      </div>
      <img
        src={CreateGroupIcon}
        alt="create group"
        className="absolute h-20 translate-x-[28.2rem] translate-y-[36rem] hover:scale-[105%] transition ease-in-out duration-200 cursor-pointer"
        onClick={() => setCreateGroup(true)}
      />
      <img
        src={Rings}
        alt="rings"
        className="absolute w-[6.2rem] translate-x-[32rem] translate-y-[8rem]"
      />
    </div>
  );
}
