import type { LanguageConfig } from "@/shared/assets/language/CONFIG_LANGUAGE";
import type { Dispatch } from "react";
export interface ChangeLanguageTypingModalProps {
  isOpen: boolean;
  selectedId: string;
  onClose: () => void;
  setLanguage: Dispatch<string>;
  onSelect: (config: LanguageConfig) => void;
}
