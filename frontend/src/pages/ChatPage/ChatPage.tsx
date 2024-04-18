import NavBar from "../../common/components/NavBar/NavBar";
import { LocalStorageUtils } from "../../common/utils/LocalStorageUtil";
import { OriInfo } from "../RegisterPage/components/InputForm";

export default function ChatPage() {
  const username = LocalStorageUtils.getData("username");
  const profilePic = LocalStorageUtils.getData("profile_picture");
  const userId = LocalStorageUtils.getData("userId");

  const user: OriInfo = {
    username: username ? username : "",
    profile_picture: profilePic ? profilePic : "1",
    userId: userId ? userId : "",
  };
  return (
    <>
      <NavBar menuFocus={"chat"} user={user} />
      <div>
        <h1>Chat Page</h1>
      </div>
    </>
  );
}
