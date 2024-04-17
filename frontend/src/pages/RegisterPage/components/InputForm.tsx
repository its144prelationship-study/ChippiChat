import { useState } from "react";
import CancelButton from "../../../common/components/Button/CancelButton/CancelButton";
import ConfirmButton from "../../../common/components/Button/ConfirmButton/ConfirmButton";
import InputText from "../../../common/components/Input/InputText";
import ProfilePic from "./ProfilePic";
import ConfirmModal from "./ConfirmModal";
import PicChooser from "../../../common/components/PicChooser/PicChooser";

export default function InputForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [profilePic, setProfilePic] = useState("1");
  const [isPicChooserOpen, setIsPicChooserOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  //check
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const tempPassword = "*".repeat(password.length);
  const tempPassword2 = "*".repeat(password2.length);
  const pics = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const onChangePassword = (value: string, mode: string) => {
    let tmppass;
    if (mode == "1") {
      tmppass = password;
      if(value !== ""){setValidPassword(true)}
    } else {
      tmppass = password2;
    }
    if (value.length > tmppass.length) {
      if (mode === "1") {
        setPassword(tmppass + value[value.length - 1]);
      } else {
        setPassword2(tmppass + value[value.length - 1]);
      }
    } else if (value.length < tmppass.length) {
      if (mode === "1") {
        setPassword(tmppass.slice(0, tmppass.length - 1));
      } else {
        setPassword2(tmppass.slice(0, tmppass.length - 1));
      }
    }
  };

  return (
    <div className="flex flex-col w-fit">
      <div className="flex flex-row space-x-24 mt-8">
        <div className="flex flex-col gap-12 mt-2 font-dm-mono justify-items-end items-end">
          <div className="w-[570px] flex flex-col justify-items-end items-end space-y-1">
            <InputText
              label="Username"
              valid={validUsername}
              placeholder="Enter Your Username"
              spellCheck={false}
              value={username}
              handleOnChange={(value) => setUsername(value)}
            />
            {validUsername === false ? (
              <div className="text-center text-cpc-red font-light text-xl">
                Please enter your username
              </div>
            ) : null}
          </div>
          <InputText
            label="Password"
            valid={validPassword}
            placeholder="Enter Your Password"
            spellCheck={false}
            value={tempPassword}
            handleOnChange={(value) => {
              onChangePassword(value, "1");
            }}
          />
          <div className="w-[700px] flex flex-col justify-items-end items-end space-y-1">
            <InputText
              label="Re-Enter Password"
              valid={validPassword}
              placeholder="Re-enter Your Password"
              spellCheck={false}
              value={tempPassword2}
              handleOnChange={(value) => {
                onChangePassword(value, "2");
              }}
            />
            {validPassword === false ? password === "" ? (
              <div className="text-center text-cpc-red font-light text-xl">
                Please enter your password
              </div>) : <div className="text-center text-cpc-red font-light text-xl">
                Password do not match !
              </div>
             : null}
          </div>
        </div>
        <ProfilePic
          pic={profilePic}
          setModal={() => {
            setIsPicChooserOpen(true);
          }}
        />
      </div>
      <div className="w-fit flex flex-row space-x-10 self-end justify-items-end mt-8">
        <CancelButton
          onCancel={() => {
            window.location.href = "http://localhost:5173/login";
          }}
        />
        <ConfirmButton
          onConfirm={() => {
            if (username === "") {
              setValidUsername(false);
            } else {
              if (password === "" || password !== password2) {
                setValidPassword(false);
                setValidUsername(true);
              } else {
                setValidPassword(true);
                setIsConfirmOpen(true);
              }
            }
          }}
        />
      </div>
      <PicChooser
        title="Choose Your Favorite"
        pics={pics}
        isVisible={isPicChooserOpen}
        onClose={() => {
          setIsPicChooserOpen(false);
        }}
        onChange={(value) => {
          setProfilePic(value);
          setIsPicChooserOpen(false);
        }}
      />
      <ConfirmModal
        isVisible={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
        }}
      />
    </div>
  );
}
