import mongoose from "mongoose";

export interface CreateChatRequest {
  participants: string[];
  group_name?: string;
  group_picture: "11" | "12" | "13" | "14";
  background_color: "ORANGE" | "GREEN" | "YELLOW" | "PURPLE" | "PINK";
  is_group: boolean;
}

export interface CreateChat {
  participants: mongoose.Types.ObjectId[];
  group_name?: string;
  group_picture: "11" | "12" | "13" | "14";
  background_color: "ORANGE" | "GREEN" | "YELLOW" | "PURPLE" | "PINK";
  is_group: boolean;
}
