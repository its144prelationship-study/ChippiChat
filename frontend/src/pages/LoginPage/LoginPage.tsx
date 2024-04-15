import { useState } from "react";
import InputText from "../../common/components/Input/InputText";
import { LoginService } from "./services/LoginService";
import { LoginSchema, OnlineUserSchema } from "./types/LoginType";
import { LocalStorageUtils } from "../../common/utils/LocalStorageUtil";
import { io } from "socket.io-client"

export default function LoginPage() {
  const [valid, setValid] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const tempPassword = '*'.repeat(password.length);
  const socket = io("http://localhost:5789");

  if (LocalStorageUtils.getData("token")) {
    window.location.href = "/search";
  }

  const login = async () => {
    if (username.length === 0 || password.length === 0) {
      setValid(false);
      return;
    }

    const loginInfo: LoginSchema = {
      username: username,
      password: password
    };

    const response = await LoginService.login(loginInfo);
    if (!response.success) {
      setValid(false);
      return;
    }

    setValid(true);
    LocalStorageUtils.setData("token", response.data.token);
    LocalStorageUtils.setData("username", response.data.username);

    const user: OnlineUserSchema = {
      user_id: response.data.user_id,
      username: response.data.username
    };

    socket.emit("addOnlineUser", user);

    window.location.href = "/search";
  };

  const onChangePassword = (value: string) => {
    if (value.length > password.length) {
      setPassword(password + value[value.length - 1]);
    } else if (value.length < password.length) {
      setPassword(password.slice(0, password.length - 1));
    }
  };

  return (
    <main className="w-full min-h-full bg-cpc-blue">
      <div className="min-h-[100vh] flex flex-wrap justify-evenly items-center gap-10 font-dm-mono">
        <div className="flex flex-col gap-2 select-none mb-44">
          <img
            src="../src/assets/chat-bubble.svg"
            className="w-[0.62] ml-auto -mr-5 -mb-6"
          />
          <div className="font-normal text-9xl text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-12">
            ChippiChat
          </div>
          <div className="bg-gradient-to-r from-white to-black/0 w-full h-1 my-4"></div>
          <div className="font-light text-[1.75rem] text-white ml-2">
            Login to start a conversation . . .
          </div>
        </div>
        <div className="bg-cpc-light-gray/[0.9] rounded-xl flex flex-col items-center p-10 my-5 drop-shadow-[4px_4px_5px_rgba(0,0,0,0.25)] select-none">
          <div className="font-light text-9xl text-black">LOGIN</div>
          <div className="h-7 font-normal text-xl text-cpc-red my-3">
            {valid ? "" : "Incorrect username or password !"}
          </div>
          <div className="flex flex-col gap-12 mt-2">
            <InputText
              label="Username"
              valid={valid}
              placeholder="Enter Your Username"
              spellCheck={false}
              value={username}
              handleOnChange={(value) => setUsername(value)}
            />
            <InputText
              label="Password"
              valid={valid}
              placeholder="Enter Your Password"
              spellCheck={false}
              value={tempPassword}
              handleOnChange={onChangePassword}
            />
          </div>
          <div className="flex flex-row gap-5 mt-20">
            <span className="font-normal text-xl text-cpc-blue">
              Don't have an account yet ?
              <br />
              <a href="/register" className="underline">
                SIGN IN
              </a>
            </span>
            <div
              className="flex items-center bg-cpc-green hover:bg-cpc-dark-green cursor-pointer border rounded-xl border-2 border-black px-11 py-1 text-2xl font-medium select-none"
              onClick={() => login()}
            >
              LOG IN
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}