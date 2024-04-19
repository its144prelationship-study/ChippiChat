import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture";

export default function SelectGroupPictureModal({ props }: { props: SelectGroupPictureType }) {
    const groupPictures = ["11", "12", "13", "14"];

    return (
        <div className="absolute h-80 w-4/5 bg-[#F7F7F7] z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-[4px_4px_5px_0px_rgb(0,0,0,.25)] p-3 flex flex-col gap-3 items-center">
            <div className="w-full flex flex-row justify-between">
                <img src="../../../src/assets/close-icon.svg" className="h-10 w-10 cursor-pointer" onClick={() => props.setSelectGroupPicture(false)} />
                <div />
            </div>
            <div className="flex text-5xl font-ibm-plex-mono font-normal">Choose your favorite</div>
            <div className="flex flex-wrap gap-12 mt-6">
                {groupPictures.map((pic) => {
                    return <div onClick={() => {
                        props.setGroupPicture(pic);
                        props.setSelectGroupPicture(false);
                    }}>
                        <ProfilePicture
                            key={pic}
                            className="h-32 w-32 rounded-full border border-transparent hover:border-4 hover:border-cpc-orange cursor-pointer duration-100"
                            pic={pic}
                        />
                    </div>
                })}
            </div>
        </div>
    );
}