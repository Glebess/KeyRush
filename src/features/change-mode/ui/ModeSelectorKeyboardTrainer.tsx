import { useState } from "react";
import styles from "./ModeSelectorKeyboardTrainer.module.css";
import { Settings } from "lucide-react";
import { CustomValueModal } from "./CustomValueModal.tsx/CustomValueModal";
export type Language = "ru" | "en";
export type Mode = "words" | "time";
export type OptionValue = number;

interface ModeSelectorKeyboardTrainerProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  selectedValue: number;
  onValueChange: (val: OptionValue) => void;
}

const LANGUAGES: Language[] = ["ru", "en"];
const MODES: Mode[] = ["words", "time"];
const WORD_OPTION: OptionValue[] = [10, 15, 25, 50];
const TIME_OPTION: OptionValue[] = [15, 30, 60, 120];

export const ModeSelectorKeyboardTrainer: React.FC<
  ModeSelectorKeyboardTrainerProps
> = ({
  language,
  onLanguageChange,
  mode = "words",
  onModeChange,
  onValueChange,
  selectedValue,
}) => {
  const currentOption = mode === "words" ? WORD_OPTION : TIME_OPTION;
  const isCustomValue = !currentOption.includes(selectedValue);
  const [isCustomValueModalOpen, setIsCustomValueModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <div className={styles.panel}>
        <div className={styles.group}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => onLanguageChange(lang)}
              className={`${styles.btn} ${language === lang ? styles.active : ""}`}
            >
              {lang.toLocaleUpperCase()}
            </button>
          ))}
        </div>
        <div className={styles.line}></div>
        {onModeChange && (
          <>
            <div className={styles.group}>
              {MODES.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`${styles.btn} ${mode === m ? styles.active : ""}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onModeChange(m)}
                >
                  {m === "words" ? "слова" : "время"}
                </button>
              ))}
            </div>

            <div className={styles.line} />
          </>
        )}
        <div>
          {currentOption.map((val) => (
            <button
              key={val}
              type="button"
              className={`${styles.btn} ${selectedValue === val ? styles.active : ""}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onValueChange(val)}
            >
              {val}
            </button>
          ))}
          <button
            type="button"
            className={`${styles.btn} ${isCustomValue ? styles.active : ""}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsCustomValueModalOpen(!isCustomValueModalOpen)}
            title="Задать свое значение"
          >
            {isCustomValue ? 1 : "⚙"}
          </button>
        </div>
      </div>
      {isCustomValueModalOpen && (
        <CustomValueModal
          mode={mode}
          isOpen={isCustomValueModalOpen}
          onClose={() => setIsCustomValueModalOpen(false)}
        />
      )}
    </>
  );
};
