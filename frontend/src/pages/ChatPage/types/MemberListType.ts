export type MemberListType = {
    user_id: string;
    username: string;
    profile_picture: string;
    selected: boolean;
    onMemberClick: () => void;
}