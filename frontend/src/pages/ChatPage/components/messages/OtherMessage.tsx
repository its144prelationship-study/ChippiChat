import ProfilePicture from "../../../../common/components/ProfilePicture/ProfilePicture";

export default function OtherMessage({
  username,
  profile_picture,
  message,
  time,
}: {
  username: string | null;
  profile_picture: string;
  message: string;
  time: string;
}) {
  return (
    <div className="w-full flex flex-row justify-start items-end m-2 space-x-3">
      <ProfilePicture pic={profile_picture} className="h-14 w-14" />
      <div>
        {username && (
          <p className="font-dm-mono text-[#888888] font-light">{username}</p>
        )}
        <div className="bg-[#D9D9D9] max-w-[45rem] p-3 rounded-xl shadow-[inset_2px_2px_4px_rgb(0,0,0,.25)] whitespace-normal break-words">
          {message}
        </div>
      </div>
      <p className="font-ibm-plex-mono text-[#888888] font-light">{time}</p>
    </div>
  );
}
