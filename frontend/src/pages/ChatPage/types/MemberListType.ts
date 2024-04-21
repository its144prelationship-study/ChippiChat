export type MemberListType = {
    _id: string;
    username: string;
    profile_picture: string;
    selected: boolean;
    onMemberClick: () => void;
}