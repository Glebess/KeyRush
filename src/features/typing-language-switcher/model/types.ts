import type { LanguageConfig } from "@/shared/assets/language/CONFIG_LANGUAGE";

export interface ChangeLanguageModalProps {
  onClose: () => void;
  onSelectLanguage: (arg: LanguageConfig) => void;
}
export interface KeyboardLanguageSelectorSectionProps {
  setIsModalChangeTypingLanguage: (arg: boolean) => void;
  selectedLanguage: LanguageConfig;
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (arg: LanguageConfig) => void;
}
