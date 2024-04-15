import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture";
import PinMark from "../../../assets/pin-mark.svg";

export default function ChatListComponent({
  chatter,
}: {
  chatter: ChatListType;
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
    <div className="bg-[#D9D9D9] w-full p-2 flex flex-row justify-between rounded-md">
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
          <p className="font-ibm-plex-mono text-[#888888] font-thin text-sm mt-[1px]">
            {chatter.last_message}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-ibm-plex-mono text-[#888888] font-thin text-sm">
          {showedDate()}
        </p>
        {chatter.is_pinned && (
          <img
            src={PinMark}
            alt="pin mark"
            className="h-6 w-6 ml-2 mt-2 -translate-x-80 translate-y-3"
          />
        )}
      </div>
    </div>
  );
}
