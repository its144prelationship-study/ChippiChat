import CloseButton from "../../../common/components/Button/CloseButton/CloseButton";
import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay";
import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture";

export default function PicChooser({
  isVisible,
  onClose,
  onChange,
  title,
  pics,
}: {
  isVisible: boolean;
  onClose: () => void;
  onChange: (value:string) => void;
  title: string;
  pics: string[];
}) {
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col w-auto p-4 bg-cpc-light-gray rounded-md">
        <CloseButton
          onClose={() => {
            onClose();
          }}
        />
        <div className="flex flex-col justify-items-center items-center pb-6">
          <div className="text-5xl font-dm-mono">{title}</div>
          <div className="grid gap-0 grid-cols-5 justify-items-center mx-8 space-y-2 -z-0 w-[970px] h-[340px] p-10">
            {pics.map((pic:string) => {
              return (
                <div key={pic} className="cursor-pointer" onClick={() => {onChange(pic)}}>
                  <ProfilePicture
                    handleMouseEnter={() => {}}
                    handleMouseLeave={() => {}}
                    pic={pic.toString()}
                    className="w-[150px] h-[150px] rounded-full hover:border-8 hover:border-cpc-orange"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
