import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture";
import { MemberListType } from "../types/MemberListType";

export default function MemberListComponent(props: MemberListType) {

    return (
        <>
            <div className="font-ibm-plex-mono flex h-[4.5rem] w-[24rem] border-b-2 border-[#E2E7F7] items-center justify-between cursor-pointer" onClick={props.onMemberClick}>
                <div className="flex flex-row items-center gap-4">
                    <ProfilePicture className="h-[56px] w-[56px]" pic={props.profile_picture} />
                    <div>{props.username}</div>
                </div>
                <img src={`../../../src/assets/${props.selected ? `selected` : `not-selected`}.svg`} className="h-[25px] w-[25px]" />
            </div>
        </>
    );
}