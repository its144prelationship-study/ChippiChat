export default function ProfilePicture({ pic }: { pic: string }) {
  return (
    <img
      src={`../../../assets/${pic}.svg`}
      alt={`Profile Picture ${pic}`}
      className="w-10 h-10 rounded-full"
    />
  );
}
