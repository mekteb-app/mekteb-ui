import { useRef } from "react";
import Modal, { ModalProps as AppModalProps } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "@/css/modal.css";

interface ModalProps extends AppModalProps {
  title: string;
}

const AppModal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  closeOnOverlayClick,
}) => {
  const myRef = useRef(null);
  return (
    <>
      <div ref={myRef} />
      <Modal
        open={open}
        onClose={onClose}
        center
        classNames={{
          modal: "lg:w-1/2",
        }}
        container={myRef.current}
        closeOnOverlayClick={closeOnOverlayClick}
      >
        <h2>{title}</h2>
        {children}
      </Modal>
    </>
  );
};

export default AppModal;
