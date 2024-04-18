import CloseIcon from "../../../assets/close-icon.svg";
import PixelHeart from "../../../assets/pixel-heart.svg";
export default function SelectedChatColorModal({
  chatColor,
  setChatColor,
  setChangeColor,
}: {
  chatColor: string;
  setChatColor: (chatColor: string) => void;
  setChangeColor: (changeColor: boolean) => void;
}) {
  const colors = [
    ["orange", "bg-[#FF994E]"],
    ["pink", "bg-[#FF8897]"],
    ["purple", "bg-[#A791FF]"],
    ["green", "bg-[#A2D92E]"],
    ["yellow", "bg-[#FFFA7C]"],
  ];
  const allColors = () => {
    return colors.map((color) => (
      <div
        key={colors.indexOf(color)}
        className={`w-[7.5rem] h-[7.5rem] rounded-full cursor-pointer ${color[1]} flex justify-center items-center shadow-[4px_4px_4px_0px_rgb(0,0,0,.25)] hover:scale-[1.02] `}
        onClick={() => {
          setChatColor(color[0]);
        }}
      >
        {chatColor === color[0] && (
          <img src={PixelHeart} alt="selected" className="w-20 h-20" />
        )}
      </div>
    ));
  };
  return (
    <div className="absolute h-80 w-4/5 bg-[#F7F7F7] z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-[4px_4px_5px_0px_rgb(0,0,0,.25)] p-3 space-y-3 flex flex-col items-center">
      <div className="w-full flex flex-row justify-between">
        <img
          src={CloseIcon}
          alt="close"
          className="h-8 w-8 cursor-pointer"
          onClick={() => setChangeColor(false)}
        />
        <div />
      </div>
      <p className="text-4xl text-black font-dm-mono font-normal">
        Choose chat theme
      </p>
      <div className="flex flex-row space-x-7 pt-3">{allColors()}</div>
    </div>
  );
}
