export default function SelectGroupPictureModal() {
    return (
        <>
            <div className="bg-white w-[40rem] h-[40rem] rounded-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 p-6">
                <div className="text-4xl font-ibm-plex-mono">Select Group Picture</div>
                <div className="flex flex-wrap gap-4">
                </div>
                <button className="bg-cpc-blue text-white rounded-xl py-2 px-4">Confirm</button>
            </div>
        </>
    );
}