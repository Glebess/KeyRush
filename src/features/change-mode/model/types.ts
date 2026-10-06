import type { QuoteLengthCategory } from "@/entities/quote/model/types";
export type Mode = "words" | "time" | "quote" | "zen";
export type OptionValue = number | QuoteLengthCategory;

export interface ModeSelectorKeyboardTrainerProps {
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
