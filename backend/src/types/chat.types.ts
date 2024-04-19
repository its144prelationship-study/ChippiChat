export interface CreateChatRequest {
  participants: string[];
  group_name?: string;
  group_picture:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14";
  background_color: "orange" | "yellow" | "pink" | "purple" | "green";
  is_group: boolean;
}
