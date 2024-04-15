import p1 from "../../../assets/1.svg";
import p2 from "../../../assets/2.svg";
import p3 from "../../../assets/3.svg";
import p4 from "../../../assets/4.svg";
import p5 from "../../../assets/5.svg";
import p6 from "../../../assets/6.svg";
import p7 from "../../../assets/7.svg";
import p8 from "../../../assets/8.svg";
import p9 from "../../../assets/9.svg";
import p10 from "../../../assets/10.svg";
import p11 from "../../../assets/11.svg";
import p12 from "../../../assets/12.svg";
import p13 from "../../../assets/13.svg";
import p14 from "../../../assets/14.svg";

export default function ProfilePicture({
  pic,
  className,
  handleMouseEnter,
  handleMouseLeave,
}: {
  pic: string;
  className: string;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}) {
  let selectedPic = "";

  switch (pic) {
    case "1":
      selectedPic = p1;
      break;
    case "2":
      selectedPic = p2;
      break;
    case "3":
      selectedPic = p3;
      break;
    case "4":
      selectedPic = p4;
      break;
    case "5":
      selectedPic = p5;
      break;
    case "6":
      selectedPic = p6;
      break;
    case "7":
      selectedPic = p7;
      break;
    case "8":
      selectedPic = p8;
      break;
    case "9":
      selectedPic = p9;
      break;
    case "10":
      selectedPic = p10;
      break;
    case "11":
      selectedPic = p11;
      break;
    case "12":
      selectedPic = p12;
      break;
    case "13":
      selectedPic = p13;
      break;
    case "14":
      selectedPic = p14;
      break;
    default:
      selectedPic = p1;
      break;
  }
  return (
    <img
      onMouseEnter={handleMouseEnter ? handleMouseEnter : () => {}}
      onMouseLeave={handleMouseLeave ? handleMouseLeave : () => {}}
      src={selectedPic}
      alt={`Profile Picture ${pic}`}
      className={className}
    />
  );
}
