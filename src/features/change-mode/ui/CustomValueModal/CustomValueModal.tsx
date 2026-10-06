import styles from "./CustomValueModal.module.css";
import type { CustomValueModalProps } from "../../model/types";
import { useEffect, useRef, useState } from "react";
// import { X } from "lucide-react";

export const CustomValueModal: React.FC<CustomValueModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>(String(0));
  const inputRef = useRef<HTMLInputElement>(null);
  const parse = parseInt(inputValue, 10);
  const min = 0;
  const max = mode === "words" ? 100000 : 86400;

  //Фокус на инпуте при открытии
  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isNaN(parse) && parse >= min && parse <= max) {
      onSubmit(parse);
      onClose();
    }
  };
  // const validationInput = (mode : Mode) : void => {
  //   if(mode === 'words'){

  //   }

  // }
  const handleCloseModal = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  return (
    <div onKeyDown={handleCloseModal} className={styles.overlay}>
      <div className={styles.modal}>
        <h3>
          {mode === "words"
            ? "Свое количество слов"
            : "Продолжительность теста"}
        </h3>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="number"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Свое значение"
            ref={inputRef}
          />

          <h5>
            <span className={styles.span_info}>
              Максимальное значение {max} {mode === "words" ? "слов." : "s."}
            </span>
            <br />
            Чтобы начать бесконеный тест,введите 0.Чтобы завершить бесконечный
            тест нажмите <span className={styles.span_keyboard_help}>
              esc
            </span>{" "}
            или кнопку прервать.
          </h5>

          <button disabled={parse < 0} type="submit">
            Применить
          </button>
        </form>
      </div>
    </div>
  );
};
