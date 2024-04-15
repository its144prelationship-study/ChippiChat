import ChatListComponent from "./ChatListComponent";
import CreateGroupIcon from "../../../assets/create-group-icon.svg";

export default function ChatLists({
  chatLists,
  setCreateGroup,
}: {
  chatLists: ChatListType[];
  setCreateGroup: (createGroup: boolean) => void;
}) {
  return (
    <div className="w-[30%] my-10 mx-16 h-[80vh] bg-[#F7F7F7]/90 rounded-lg py-6 pl-6 pr-10 space-y-3 shadow-[4px_4px_5px_0px_rgba(0,0,0,0.3)] overflow-auto">
      <img
        src={CreateGroupIcon}
        alt="create group"
        className="h-20 absolute translate-x-[22.5rem] translate-y-[33rem]"
        onClick={() => setCreateGroup(true)}
      />
      {chatLists.map((chatList, index) => (
        <ChatListComponent key={index} chatter={chatList} />
      ))}
    </div>
  );
}
