import { useState, useEffect } from "react";
import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture"
import MemberListComponent from "./MemberListComponent";
import CancelButton from "../../../common/components/Button/CancelButton/CancelButton";
import ConfirmButton from "../../../common/components/Button/ConfirmButton/ConfirmButton";
import SelectGroupPictureModal from "./SelectGroupPictureModal";

export default function CreateGroupModal(props: { setCreateGroup: (createGroup: boolean) => void }) {
  const [groupName, setGroupName] = useState<string>("");
  const [hasGroupName, setHasGroupName] = useState<boolean>(true);
  const [selectGroupPicture, setSelectGroupPicture] = useState<boolean>(false);
  const [groupPicture, setGroupPicture] = useState<string>("11");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const onlineUsers = [
    { user_id: "01", username: "WoonHakki", profile_picture: "1" },
    { user_id: "02", username: "HamJisung", profile_picture: "2" },
    { user_id: "03", username: "แม๋ว", profile_picture: "5" },
    { user_id: "04", username: "Ped Ped", profile_picture: "3" },
    { user_id: "05", username: "Pang Pang", profile_picture: "4" },
    { user_id: "06", username: "Nong Nong", profile_picture: "6" },
    { user_id: "07", username: "Mhee Mhee", profile_picture: "7" },
    { user_id: "08", username: "Nan Nan", profile_picture: "8" },
    { user_id: "09", username: "Ploy Ploy", profile_picture: "9" },
    { user_id: "10", username: "Pang Pang", profile_picture: "4" },
    { user_id: "11", username: "Nong Nong", profile_picture: "6" },
    { user_id: "12", username: "Mhee Mhee", profile_picture: "7" },
    { user_id: "13", username: "Nan Nan", profile_picture: "8" },
    { user_id: "14", username: "Ploy Ploy", profile_picture: "9" },
  ]

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

  const handleCreateGroup = () => {
    if (groupName === "") {
      setHasGroupName(false);
      return;
    }

    console.log("Create Group");
    console.log("Group Name:", groupName);
    console.log("Group Picture:", groupPicture);
    console.log("Selected Members:", selectedMembers);
    props.setCreateGroup(false);
  };

  useEffect(() => {
    console.log("GroupName:", groupName);
    console.log("GroupPicture:", groupPicture);
    console.log("SelectedMembers:", selectedMembers);
  }, [groupName, groupPicture, selectedMembers]);

  return (
    <>
      {
        selectGroupPicture &&
        <div
          className="absolute inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => {
            setSelectGroupPicture(false);
          }}
        />
      }
      {selectGroupPicture && <SelectGroupPictureModal
        props={{
          setSelectGroupPicture: setSelectGroupPicture,
          setGroupPicture: setGroupPicture
        }}
      />}
      <div className="absolute min-h-4/5 w-fit bg-[#F7F7F7] z-20 font-dm-mono font-medium py-[2.5rem] px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl drop-shadow-[4px_4px_5px_rgba(0,0,0,0.25)] flex flex-col items-center gap-10">
        <div className="flex flex-row gap-6 items-center min-w-[568px]">
          <div className="cursor-pointer hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] select-none" onClick={() => setSelectGroupPicture(true)}>
            <img src="../../../src/assets/edit-group-profile-icon.svg" className="absolute h-8 w-8 translate-x-[5.15rem] translate-y-[5.15rem]" />
            <ProfilePicture className="h-[7rem] w-[7rem] border-[5px] border-cpc-blue rounded-full" pic={groupPicture} />
          </div>
          <div className="flex flex-row h-[5.5rem]">
            <span className="text-xl text-black mt-7">Group name:</span>
            <input className={`w-72 rounded-xl my-auto ml-3 pl-3 py-4 font-light text-base items-center inner-shadow-4 ${hasGroupName ? "bg-cpc-gray placeholder-cpc-verylight-gray" : "bg-[#FF9F9F] placeholder-cpc-salmon-red"}`}
              type="text"
              placeholder="Enter Your Group Name"
              spellCheck={false}
              value={groupName}
              onChange={(e) => handleChangeGroupName(e.target.value)}
            />
          </div>
        </div>
        <div className="h-[320px] w-fit rounded-xl pt-5 px-4 py-2 border-2 border-black/20 overflow-y-auto scrollbar-none">
          <div className="flex flex-col gap-1">
            {onlineUsers.map((user, index) => (
              <MemberListComponent
                key={index}
                {...user}
                selected={selectedMembers.includes(user.user_id)}
                onMemberClick={() => handleMemberSelection(user.user_id)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-8 select-none">
          <CancelButton
            onCancel={() => { props.setCreateGroup(false) }}
          />
          <ConfirmButton
            onConfirm={handleCreateGroup}
          />
        </div>
      </div>
    </>
  );
}
