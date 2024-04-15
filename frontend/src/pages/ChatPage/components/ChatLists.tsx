import ChatListComponent from "./ChatListComponent";

export default function ChatLists({
  chatLists,
}: {
  chatLists: ChatListType[];
}) {
  return (
    <div className="w-[30%] my-10 mx-16 h-[80vh] bg-[#F7F7F7]/90 rounded-lg py-6 pl-6 pr-10 space-y-3 shadow-[4px_4px_5px_0px_rgba(0,0,0,0.3)] overflow-auto">
      {chatLists.map((chatList, index) => (
        <>
        <ChatListComponent key={index} chatter={chatList} />
        <ChatListComponent key={index} chatter={chatList} />
        <ChatListComponent key={index} chatter={chatList} />
        <ChatListComponent key={index} chatter={chatList} /></>
      ))}
    </div>
  );
}
