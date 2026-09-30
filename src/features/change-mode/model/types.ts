export type Language = "ru" | "en";
export type Mode = "words" | "time";
export type OptionValue = number;

export interface ModeSelectorKeyboardTrainerProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  selectedValue: number;
  onValueChange: (val: OptionValue) => void;
}

export interface CustomValueModalProps {
  isOpen: boolean;
  mode: Mode;
  onClose: () => void;
  onSubmit: (val: number) => void;
}
