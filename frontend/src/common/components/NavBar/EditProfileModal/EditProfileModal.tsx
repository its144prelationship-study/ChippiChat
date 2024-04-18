import ModalOverlay from "../../ModalOverlay/ModalOverlay";
import InputForm, {
  OriInfo,
} from "../../../../pages/RegisterPage/components/InputForm";

export default function EditProfileModal({
  isVisible,
  onClose,
  user,
}: {
  isVisible: boolean;
  onClose: () => void;
  user: OriInfo;
}) {
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ boxShadow: "4px 4px 5px 0 rgba(0, 0, 0, 0.25)" }}
        className="bg-cpc-light-gray p-8 rounded-md bg-opacity-90 right-24 top-28 fixed"
      >
        <InputForm formType={"UPDATE"} onClose={onClose} oriInfo={user} />
      </div>
    </ModalOverlay>
  );
}
