import { useState } from "react";
import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture";
import LikeIcon from "../../../assets/like-icon.svg";
import LikeIconHover from "../../../assets/like-icon-hover.svg";

export default function OnlineUser({
  is_group,
  chat_name,
  members,
  profile_picture,
  onClick,
}: {
  is_group: boolean;
  chat_name: string;
  members: number;
  profile_picture: string;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="flex flex-col items-center m-5" onClick={onClick}>
      <div className="flex flex-row">
        <ProfilePicture
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          pic={profile_picture}
          className={`h-[8.5rem] rounded-full bg-cover ${isHovered ? "border-cpc-orange" : "border-white"} border-4 cursor-pointer`}
        />
        <img
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          src={isHovered ? LikeIconHover : LikeIcon}
          className="absolute w-20 h-20 -translate-y-6 translate-x-[8.2rem] cursor-pointer"
        />
      </div>
      <p
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`py-2 font-dm-mono text-2xl font-medium ${isHovered ? "text-cpc-orange" : "text-white"}`}
      >
        {chat_name} {is_group ? `(${members.toString()})` : ""}
      </p>
    </div>
  );
}
