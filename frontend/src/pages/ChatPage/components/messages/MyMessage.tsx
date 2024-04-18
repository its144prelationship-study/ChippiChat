export default function MyMessage({
  message,
  time,
}: {
  message: string;
  time: string;
}) {
  return (
    <div className="w-full flex flex-row justify-end items-end m-2 space-x-3">
      <p className="font-ibm-plex-mono text-[#888888] font-light">{time}</p>
      <div className="bg-cpc-green max-w-[45rem] p-3 rounded-xl shadow-[2px_2px_2px_rgb(0,0,0,.25)] whitespace-normal break-words">
        {message}
      </div>
    </div>
  );
}
