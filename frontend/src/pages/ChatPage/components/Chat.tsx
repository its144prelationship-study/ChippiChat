export default function Chat({
  chatColor,
  setChangeColor,
  selectedChat,
}: {
  chatColor: string;
  setChangeColor: (changeColor: boolean) => void;
  selectedChat: string;
}) {
  let bgColor = "bg-[#E2E7F7]";
  let bgTopColor = "bg-cpc-orange";
  switch (chatColor) {
    case "orange":
      bgColor = "bg-[#E2E7F7]";
      bgTopColor = "bg-cpc-orange";
      break;
    case "pink":
      bgColor = "bg-[#FFE6E9]";
      bgTopColor = "bg-[#FF8897]";
      break;
    case "purple":
      bgColor = "bg-[#E5DFFF]";
      bgTopColor = "bg-[#A791FF]";
      break;
    case "green":
      bgColor = "bg-[#E7F7E2]";
      bgTopColor = "bg-[#A2D92E]";
      break;
    case "yellow":
      bgColor = "bg-[#FFFDD6]";
      bgTopColor = "bg-[#FFFA7C]";
      break;
  }
  return (
    <div
      className={`w-[60%] h-[80vh] my-10 mr-16 ml-5 ${bgColor} rounded-md shadow-[inset_2px_2px_6px_0px_rgba(0,0,0,0.25)]`}
    >
      <div
        className={`w-full h-[4.5rem] ${bgTopColor} rounded-t-md shadow-[inset_2px_2px_6px_0px_rgba(0,0,0,0.25)]`}
      ></div>
    </div>
  );
}
