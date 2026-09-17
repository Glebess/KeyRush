import styles from "./ModeSelectorKeyboardTrainer.module.css";

export type Language = "ru" | "en";
export type TimeOption = 15 | 30 | 60;
export type Mode = "words" | "time" | "errors";
export type WordsOption = 10 | 25 | 50;

export type OptionValue = TimeOption | WordsOption;

interface ModeSelectorKeyboardTrainerProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  selectedValue: number;
  onValueChange: (val: OptionValue) => void;
}

export const ModeSelectorKeyboardTrainer = ({
  language,
  onLanguageChange,
  mode,
  onModeChange,
  selectedValue,
  onValueChange,
}: ModeSelectorKeyboardTrainerProps) => {
  const option = mode === "time" ? [15, 30, 60] : [10, 25, 50];
  return (
    <div className={styles.panel}>
      <div className={styles.group}>
        {(["ru", "en"] as Language[]).map((lang) => (
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
    </div>
  );
};
