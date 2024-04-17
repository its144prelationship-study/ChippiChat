import CancelButton from "../../../common/components/Button/CancelButton/CancelButton";
import ConfirmButton from "../../../common/components/Button/ConfirmButton/ConfirmButton";
import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay";

export default function ConfirmModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div className="bg-cpc-light-gray p-16 rounded-md justify-items-center items-center space-y-8">
        <div className="font-dm-mono text-2xl text-center">
          Do you want <br /> to create a new account
        </div>
        <div className="flex flex-row space-x-10">
          <CancelButton onCancel={() => {onClose()}} />
          <ConfirmButton onConfirm={() => {}} />
        </div>
      </div>
    </ModalOverlay>
  );
}
