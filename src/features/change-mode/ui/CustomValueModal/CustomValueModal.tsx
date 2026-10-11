import styles from "./CustomValueModal.module.css";
import type { CustomValueModalProps } from "../../model/types";
import { useEffect, useRef, useState } from "react";

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
  const xIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>
  );
  const ValidationInput = () => {
    if (isNaN(parse)) {
      return (
        <div
          className={`${styles.svg_container} ${styles.errorIcon}`}
          title="Значение не может быть пустым"
        >
          {xIcon}
        </div>
      );
    } else if (parse < min) {
      return (
        <div
          className={`${styles.svg_container} ${styles.errorIcon}`}
          title={`Значение не может быть меньше ${min}`}
        >
          {xIcon}
        </div>
      );
    } else if (parse > max) {
      return (
        <div
          className={`${styles.svg_container} ${styles.errorIcon}`}
          title={`Максимальное значение ${mode === "words" ? "слов" : "времени"} ${max}`}
        >
          {xIcon}
        </div>
      );
    } else {
      return (
        <div className={`${styles.svg_container} ${styles.successIcon}`}>
          {checkIcon}
        </div>
      );
    }
  };
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
          <div className={styles.input_container}>
            <input
              type="number"
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Свое значение"
              ref={inputRef}
            />
            <ValidationInput />
          </div>
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
