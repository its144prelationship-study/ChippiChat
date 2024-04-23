import { useState, useContext, useEffect } from "react";
import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture";
import MemberListComponent from "./MemberListComponent";
import CancelButton from "../../../common/components/Button/CancelButton/CancelButton";
import ConfirmButton from "../../../common/components/Button/ConfirmButton/ConfirmButton";
import SelectGroupPictureModal from "./SelectGroupPictureModal";
import { AuthContext } from "../../../common/context/AuthContext";
import { ChatContext } from "../../../common/context/ChatContext";
import { ChatService } from "../services/ChatService";

type UserListType = {
  _id: string;
  username: string;
  profile_picture: string;
};

export default function CreateGroupModal(props: {
  setCreateGroup: (createGroup: boolean) => void;
}) {
  const user = useContext(AuthContext);
  const chat = useContext(ChatContext);
  const [groupName, setGroupName] = useState<string>("");
  const [hasGroupName, setHasGroupName] = useState<boolean>(true);
  const [selectGroupPicture, setSelectGroupPicture] = useState<boolean>(false);
  const [groupPicture, setGroupPicture] = useState<string>("11");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<UserListType[]>([]);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const users = await ChatService.getAllUsers();
        const filteredUsers = users.filter(
          (u: UserListType) => u._id !== user.user_id
        );
        setAllUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    }

    fetchAllUsers();
  }, []);

  const handleChangeGroupName = (value: string) => {
    setGroupName(value);
    if (value !== "") {
      setHasGroupName(true);
    }
  };

  const handleMemberSelection = (user_id: string) => {
    setSelectedMembers((prevSelectedMembers) => {
      if (prevSelectedMembers.includes(user_id)) {
        return prevSelectedMembers.filter((member) => member !== user_id);
      } else {
        return [...prevSelectedMembers, user_id];
      }
    });
  };

  const handleCreateGroup = async () => {
    if (groupName === "") {
      setHasGroupName(false);
      return;
    }

    const data = await ChatService.createGroup(
      [user.user_id, ...selectedMembers],
      groupName,
      groupPicture
    );
    if (!data) {
      console.error("Failed to create group");
      alert("Failed to create group");
      return;
    }

    chat.updateSelectedChat(data._id);
    props.setCreateGroup(false);
  };

  return (
    <>
      {selectGroupPicture && (
        <div
          className="absolute inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => {
            setSelectGroupPicture(false);
          }}
        />
      )}
      {selectGroupPicture && (
        <SelectGroupPictureModal
          props={{
            setSelectGroupPicture: setSelectGroupPicture,
            setGroupPicture: setGroupPicture,
          }}
        />
      )}
      <div className="absolute min-h-4/5 w-fit bg-[#F7F7F7] z-20 font-dm-mono font-medium py-[2.5rem] px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl drop-shadow-[4px_4px_5px_rgba(0,0,0,0.25)] flex flex-col items-center gap-10">
        <div className="flex flex-row gap-6 items-center min-w-[568px]">
          <div
            className="cursor-pointer hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] select-none"
            onClick={() => setSelectGroupPicture(true)}
          >
            <img
              src="../../../src/assets/edit-group-profile-icon.svg"
              className="absolute h-8 w-8 translate-x-[5.15rem] translate-y-[5.15rem]"
            />
            <ProfilePicture
              className="h-[7rem] w-[7rem] border-[5px] border-cpc-blue rounded-full"
              pic={groupPicture}
            />
          </div>
          <div className="flex flex-row h-[5.5rem]">
            <span className="text-xl text-black mt-7">Group name:</span>
            <input
              className={`w-72 rounded-xl my-auto ml-3 pl-3 py-4 font-light text-base items-center inner-shadow-4 ${
                hasGroupName
                  ? "bg-cpc-gray placeholder-cpc-verylight-gray"
                  : "bg-[#FF9F9F] placeholder-cpc-salmon-red"
              }`}
              type="text"
              placeholder="Enter Your Group Name"
              spellCheck={false}
              value={groupName}
              onChange={(e) => handleChangeGroupName(e.target.value)}
            />
          </div>
        </div>
        <div className="h-[320px] w-[26rem] rounded-xl pt-5 px-4 py-2 border-2 border-black/20 overflow-y-auto scrollbar-none">
          <div className="flex flex-col gap-1">
            {allUsers.map((user: UserListType, index) => (
              <MemberListComponent
                key={index}
                {...user}
                selected={selectedMembers.includes(user._id)}
                onMemberClick={() => handleMemberSelection(user._id)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-8 select-none">
          <CancelButton
            onCancel={() => {
              props.setCreateGroup(false);
            }}
          />
          <ConfirmButton onConfirm={handleCreateGroup} />
        </div>
      </div>
    </>
  );
}
