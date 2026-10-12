import styles from "./MobileModeSelectorTrainer.module.css";
import type { Mode, OptionValue } from "../../model/types";
import { CustomValueModal } from "../CustomValueModal/CustomValueModal";
import { useState } from "react";
export const MobileModeSelectorTrainer = ({
  mode,
  onModeChange,
  onValueChange,
  selectedValue,
  onClose,
}) => {
  const WORD_OPTION: OptionValue[] = [10, 15, 25, 100];
  const TIME_OPTION: OptionValue[] = [15, 30, 60, 120];
  const QUOTE_OPTION: OptionValue[] = [
    "all",
    "short",
    "medium",
    "long",
    "huge",
  ];
  const currentOption =
    mode === "words"
      ? WORD_OPTION
      : mode === "time"
        ? TIME_OPTION
        : QUOTE_OPTION;

  const isCustomModeSupported = mode === "words" || mode === "time";
  const isCustomValue =
    isCustomModeSupported && !currentOption.includes(selectedValue);

  const [isCustomValueModalOpen, setIsCustomValueModalOpen] =
    useState<boolean>(false);

  const handleCustomSubmit = (customVal: number) => {
    onValueChange(customVal);
    setIsCustomValueModalOpen(false);
  };

  const BUTTON_CONFIG: { label: string; value: Mode }[] = [
    { label: "слова", value: "words" },
    { label: "время", value: "time" },
    { label: "цитаты", value: "quote" },
  ];
  return (
    <>
      {isCustomValueModalOpen && (
        <CustomValueModal
          isOpen={isCustomValueModalOpen}
          mode={mode}
          onClose={() => setIsCustomValueModalOpen(false)}
          onSubmit={handleCustomSubmit}
        />
      )}
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.button_container}>
            {BUTTON_CONFIG.map((item) => (
              <button
                key={item.value}
                className={
                  mode === item.value
                    ? `${styles.button} ${styles.active}`
                    : styles.button
                }
                onClick={() => onModeChange(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className={styles.line}></div>

          <div className={styles.button_container}>
            {currentOption.map((opt) => (
              <button
                key={String(opt)}
                className={
                  selectedValue === opt
                    ? `${styles.button} ${styles.active}`
                    : styles.button
                }
                onClick={() => onValueChange(opt)}
              >
                {opt}
              </button>
            ))}
            {mode !== "quote" && (
              <button
                className={
                  isCustomValue
                    ? `${styles.button} ${styles.active}`
                    : styles.button
                }
                onClick={() => setIsCustomValueModalOpen(true)}
              >
                Свое значение
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
