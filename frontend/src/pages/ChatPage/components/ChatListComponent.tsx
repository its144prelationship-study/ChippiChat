import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture";
import PinMark from "../../../assets/pin-mark.svg";

export default function ChatListComponent({
  chatter,
  is_selected,
  setSelectedChat,
}: {
  chatter: ChatListType;
  is_selected: boolean;
  setSelectedChat: (selectedChat: string) => void;
}) {
  const showedDate = () => {
    const today = new Date();
    const date = new Date(chatter.last_message_time);
    if (today.getDate() === date.getDate()) {
      return date.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("us-EN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  };
  return (
    <div
      className={`${is_selected ? "bg-[#f1f1f1] shadow-[inset_2px_2px_6px_0px_rgba(0,0,0,0.25)]" : "bg-[#D9D9D9] hover:bg-[#e0e0e0] hover:shadow-md "} w-full p-2 flex flex-row justify-between rounded-md cursor-pointer hover:scale-[101%] transition duration-200 ease-in-out`}
      onClick={() => {
        chatter.onChatClick();
        setSelectedChat(chatter.id);
      }}
    >
      <div className="flex flex-row space-x-4">
        <ProfilePicture className="h-16 w-16" pic={chatter.profile_picture} />
        <div className="flex flex-col py-2">
          <span className="flex flex-row">
            <h3 className="font-dm-mono font-medium text-[17px] text-black overflow-clip">
              {chatter.chatname.length > 15
                ? chatter.chatname.slice(0, 15) + ".."
                : chatter.chatname}
            </h3>
            {chatter.is_group && (
              <h3 className="font-dm-mono font-medium text-[17px] text-black overflow-clip">
                {`(${chatter.members})`}
              </h3>
            )}
          </span>
          <p className="font-ibm-plex-mono text-[#888888] font-normal text-sm mt-[1px]">
            {chatter.last_message}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <p className="font-ibm-plex-mono text-[#888888] font-light text-sm">
          {showedDate()}
        </p>
        <div className="flex flex-row">
          <img
            src={PinMark}
            alt="pin mark"
            className={`h-6 w-6 ml-2 mt-2 -translate-x-[19rem] ${chatter.is_pinned ? "" : "opacity-0"}`}
          />
          <div
            className={`bg-cpc-orange w-6 h-6 rounded-full flex justify-center items-center ${chatter.unread > 0 ? "" : "opacity-0"}`}
          >
            <p className="text-white font-ibm-plex-mono font-normal text-xs">
              {chatter.unread}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
