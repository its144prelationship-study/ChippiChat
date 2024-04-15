export default function ProfilePicture({ pic, size }: { pic: string, size: number}) {
  return (
    <img
      src={`../../../assets/${pic}.svg`}
      alt={`Profile Picture ${pic}`}
      className={`w-${size.toString()} h-${size.toString()} rounded-full`}
    />
  );
}
