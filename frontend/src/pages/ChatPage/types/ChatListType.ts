type ProfilePictureEnum = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14";

type ChatListType = {
      id: string,
      chatname: string,
      last_message: string
      last_message_time: string,
      unread: number,
      is_pinned: boolean,
      profile_picture: ProfilePictureEnum
      is_group: boolean,
      members: number,
      onChatClick: () => void
    };