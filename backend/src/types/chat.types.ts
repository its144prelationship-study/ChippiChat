export interface CreateChatRequest {
  participants: string[];
  group_name?: string;
  group_picture: "11" | "12" | "13" | "14";
  background_color: "ORANGE" | "GREEN" | "YELLOW" | "PURPLE" | "PINK";
  is_group: boolean;
}
