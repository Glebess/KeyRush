import styles from "./CustomValueModal.module.css";
import { type Mode } from "../ModeSelectorKeyboardTrainer";
import { useEffect, useRef, useState } from "react";
interface CustomValueModalProps {
  isOpen: boolean;
  mode: Mode;
  onClose: () => void;
  onSubmit: (val: number) => void;
}
export const CustomValueModal: React.FC<CustomValueModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>(String(0));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  const handleCloseModal = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  return (
    <div>
      <p>1</p>
    </div>
  );
};
