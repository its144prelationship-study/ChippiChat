import EditButton from "../../../common/components/Button/EditButton/EditButton";
import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture";
import { profilePicture } from "../types/RegisterType";

export default function ProfilePic({pic,setModal} : {pic:profilePicture ,setModal : () => void}) {
  return (
    <div className="relative flex w-[250px] h-[250px]">
      <div className="z-3 absolute bottom-0 right-0">
        <EditButton onEdit={setModal}/>
      </div>
      <ProfilePicture
          handleMouseEnter={() => {}}
          handleMouseLeave={() => {}}
          pic={pic.toString()}
          className="w-[250px] h-[250px] rounded-full border-4 border-white"
        />
    </div>
  );
}
