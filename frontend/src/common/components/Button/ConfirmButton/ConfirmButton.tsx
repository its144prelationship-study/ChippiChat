export default function ConfirmButton({onConfirm} : {onConfirm : () => void}) {
  return (
    <div>
      <button
        onClick={() => {onConfirm()}}
        style={{ transition: "background-color 0.3s" }}
        className="w-[145px] bg-cpc-green py-1 px-2 rounded-lg border-2 border-black font-dm-mono text-2xl hover:bg-cpc-dark-green"
      >
        Confirm
      </button>
    </div>
  );
}
