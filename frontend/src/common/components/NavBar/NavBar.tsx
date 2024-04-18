import { useNavigate } from "react-router-dom";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import { LocalStorageUtils } from "../../utils/LocalStorageUtil";
import { OriInfo } from "../../../pages/RegisterPage/components/InputForm";

type MenuFocus = "search" | "chat" | "none";

export default function NavBar({
  menuFocus,
  user,
}: {
  menuFocus: MenuFocus;
  user: OriInfo;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const menuList: { name: string; focus: MenuFocus; href: string }[] = [
    {
      name: "Search",
      focus: "search",
      href: "/search",
    },
    {
      name: "My Chat",
      focus: "chat",
      href: "/chat",
    },
  ];

  const handleLogout = () => {
    LocalStorageUtils.removeData("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between py-3 px-6 items-center bg-cpc-orange">
      <div className="flex gap-6 items-center text-white font-noto-sans font-light">
        {menuList.map((menu, index) => (
          <div key={menu.focus} className="relative w-[250px]">
            {menuFocus === menu.focus ? ring("#2260FF") : ring("#FFFFFF")}
            <a
              key={index}
              style={{
                textShadow: `
                  -1px -1px 1px rgba(0, 0, 0, 0.25),
                  1px 1px 1px rgba(0, 0, 0, 0.25)
                `,
              }}
              className={`${
                menuFocus === menu.focus ? "text-cpc-blue" : ""
              } w-[170px] cursor-pointer text-3xl font-dm-mono z-3 absolute top-10 left-14`}
              href={menu.href}
            >
              {menu.name}
            </a>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-5 text-sm">
        <div className="flex items-center justify-center gap-3">
          <div className="flex flex-col items-end text-black font-dm-mono">
            <div className="text-2xl">{user.username}</div>
            <div
              onClick={() => {
                setIsEdit(true);
              }}
              style={{ transition: "background-color 0.3s" }}
              className="cursor-pointer flex flex-row justify-items-center items-center space-x-2 px-2 py-1 bg-cpc-light-orange border-2 border-black rounded-2xl hover:bg-cpc-brown hover:text-white"
            >
              <PencilIcon />
              <div className="text-lg font-light">Edit Profile</div>
            </div>
          </div>
          <ProfilePicture
            handleMouseEnter={() => {}}
            handleMouseLeave={() => {}}
            pic={user.profile_picture.toString()}
            className="w-[75px] h-[75px] rounded-full"
          />
          <div className="cursor-pointer" onClick={() => handleLogout()}>
            <LogoutIcon />
          </div>
        </div>
      </div>
      <EditProfileModal
        isVisible={isEdit}
        onClose={() => {
          setIsEdit(false);
        }}
        user={user}
      />
    </div>
  );
}

const ring = (color: string) => {
  return (
    <svg
      width="230"
      height="116"
      viewBox="0 0 228 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood
            floodColor="black"
            floodOpacity="0.25"
            result="shadowColor"
          />
          <feComposite
            in="SourceAlpha"
            in2="shadowColor"
            operator="in"
            result="shadow"
          />
          <feOffset dx="-2" dy="-2" />
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Apply the filter to the path */}
      <path
        d="M161.5 14.5H66.5V24.1667H47.5V33.8333H28.5V82.1667H47.5V91.8333H66.5V101.5H161.5V91.8333H180.5V82.1667H199.5V33.8333H180.5V24.1667H161.5V14.5ZM161.5 24.1667V33.8333H180.5V82.1667H161.5V91.8333H66.5V82.1667H47.5V33.8333H66.5V24.1667H161.5Z"
        fill={color}
        filter="url(#inner-shadow)" // Apply the filter here
      />
    </svg>
  );
};

const LogoutIcon = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      width="60"
      height="61"
      viewBox="0 0 60 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={hovered ? "logout-icon-hover" : ""}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <defs>
        <filter id="inner-shadow">
          <feOffset dx="-2" dy="-2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M46.3637 3.22726V5.95454H49.091V16.8636H46.3637V14.1364H43.6365V8.68181H16.3637V52.3182H43.6365V46.8636H46.3637V44.1364H49.091V55.0454H46.3637V57.7727H13.6365V55.0454H10.9092V5.95454H13.6365V3.22726H46.3637ZM35.4546 16.8636H40.9092V19.5909H43.6365V22.3182H46.3637V25.0454H49.091V27.7727H51.8183V33.2273H49.091V35.9545H46.3637V38.6818H43.6365V41.4091H40.9092V44.1364H35.4546V38.6818H38.1819V35.9545H40.9092V33.2273H21.8183V27.7727H40.9092V25.0454H38.1819V22.3182H35.4546V16.8636Z"
        fill="white"
        filter={hovered ? "url(#inner-shadow)" : "none"}
      />
    </svg>
  );
};

const PencilIcon = () => {
  return (
    <svg
      width="26"
      height="25"
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_179_274)">
        <path
          d="M6.4082 22.9167L7.88932 21.4355L4.06445 17.6107L2.58333 19.0918V20.8333H4.66667V22.9167H6.4082ZM14.9206 7.8125C14.9206 7.57378 14.8012 7.45443 14.5625 7.45443C14.454 7.45443 14.3618 7.4924 14.2858 7.56836L5.46419 16.39C5.38824 16.4659 5.35026 16.5582 5.35026 16.6667C5.35026 16.9054 5.46962 17.0247 5.70833 17.0247C5.81684 17.0247 5.90907 16.9868 5.98503 16.9108L14.8066 8.08919C14.8826 8.01324 14.9206 7.92101 14.9206 7.8125ZM14.0417 4.6875L20.8125 11.4583L7.27083 25H0.5V18.2292L14.0417 4.6875ZM25.1582 6.25C25.1582 6.82509 24.9575 7.31337 24.556 7.71484L21.8542 10.4167L15.0833 3.64583L17.7852 0.960286C18.1758 0.54796 18.6641 0.341797 19.25 0.341797C19.8251 0.341797 20.3188 0.54796 20.7311 0.960286L24.556 4.76888C24.9575 5.19206 25.1582 5.68576 25.1582 6.25Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_179_274">
          <rect
            width="25"
            height="25"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
