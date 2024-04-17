export default function CancelButton({onCancel} : {onCancel: () => void}) {
  return (
    <div>
      <button
        onClick={() => {onCancel()}}
        style={{ transition: "background-color 0.3s" }}
        className="w-[145px] bg-cpc-salmon-red py-1 px-2 rounded-lg border-2 border-black font-dm-mono text-2xl hover:bg-cpc-dark-red"
      >
        Cancel
      </button>
    </div>
  );
}
