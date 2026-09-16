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
  return <div>1</div>;
};
