import { ChatListType } from "../../pages/ChatPage/types/ChatListType";
import { chatGroupMessages, groupMembers } from "../context/ChatContext";

export type ChatContextType = {
  selectedChat: string;
  chatColor: string;
  chatLists: ChatListType[];
  currentId: string;
  groupMembers: groupMembers[];
  chatGroupMessages: chatGroupMessages[];
};
