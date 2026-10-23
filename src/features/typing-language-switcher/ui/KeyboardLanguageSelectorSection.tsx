import styles from "./KeyboardLanguageSelectorSection.module.css";
import type { KeyboardLanguageSelectorSectionProps } from "../model/types";
import { translateIcon } from "@/shared/assets/svg/TrainerPageSvg";
import { ChangeLanguageModal } from "./ChangeLanguageModal";
export const KeyboardLanguageSelectorSection = ({
  setIsModalChangeTypingLanguage,
  selectedLanguage,
  isOpen,
  onClose,
  onSelectLanguage,
}: KeyboardLanguageSelectorSectionProps) => {
  return (
    <div className={styles.language} title="Выбрать язык печати">
      {isOpen && (
        <ChangeLanguageModal
          onClose={onClose}
          onSelectLanguage={onSelectLanguage}
        />
      )}
      <button
        className={styles.language_change}
        onClick={() => setIsModalChangeTypingLanguage(true)}
      >
        {translateIcon}
        <span>{selectedLanguage.label}</span>
      </button>
    </div>
  );
};
