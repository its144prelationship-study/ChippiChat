import CancelButton from "../../../common/components/Button/CancelButton/CancelButton";
import ConfirmButton from "../../../common/components/Button/ConfirmButton/ConfirmButton";
import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay";

export default function ConfirmModal({
  isVisible,
  onClose,
  onConfirm,
  type
}: {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: string;
}) {
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div className="bg-cpc-light-gray p-16 rounded-md justify-items-center items-center space-y-8">
        {<div className="font-dm-mono text-2xl text-center">
          Do you want <br /> to {type === "UPDATE" ? "update your profile": "create an account"}?
        </div>}
        <div className="flex flex-row space-x-10">
          <CancelButton onCancel={() => {onClose()}} />
          <ConfirmButton onConfirm={() => {onConfirm()}} />
        </div>
      </div>
    </ModalOverlay>
  );
}
