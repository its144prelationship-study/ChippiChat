import ChatListComponent from "./ChatListComponent";
import CreateGroupIcon from "../../../assets/create-group-icon.svg";
import Rings from "../../../assets/rings.svg";

export default function ChatLists({
  chatLists,
  setCreateGroup,
  selectedChat,
  setSelectedChat,
  chatColor,
}: {
  chatLists: ChatListType[];
  setCreateGroup: (createGroup: boolean) => void;
  selectedChat: string;
  setSelectedChat: (selectedChat: string) => void;
  chatColor: string;
}) {
  let color = "bg-cpc-orange";
  switch (chatColor) {
    case "orange":
      color = "bg-cpc-orange";
      break;
    case "pink":
      color = "bg-[#FF8897]";
      break;
    case "purple":
      color = "bg-[#A791FF]";
      break;
    case "green":
      color = "bg-[#A2D92E]";
      break;
    case "yellow":
      color = "bg-[#FFFA7C]";
      break;
  }
  return (
    <div className="flex flex-row">
      <div className="w-[30rem] my-10 ml-16 mr-5 h-[40rem] bg-[#F7F7F7]/90 rounded-lg py-6 pl-6 pr-10 space-y-3 shadow-[4px_4px_5px_0px_rgba(0,0,0,0.3)] overflow-auto">
        {chatLists.map((chatList, index) => (
          <ChatListComponent
            key={index}
            chatter={chatList}
            is_selected={selectedChat === chatList.id}
            setSelectedChat={setSelectedChat}
            color={color}
          />
        ))}
      </div>
      <img
        src={CreateGroupIcon}
        alt="create group"
        className="absolute h-20 translate-x-[28.2rem] translate-y-[37rem] hover:scale-[105%] transition ease-in-out duration-200 cursor-pointer"
        onClick={() => setCreateGroup(true)}
      />
      <img
        src={Rings}
        alt="rings"
        className="absolute w-[6.2rem] translate-x-[32rem] translate-y-[10rem]"
      />
    </div>
  );
}
