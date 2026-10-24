import type { Mode } from "./types";
import type { OptionValue } from "./types";
import {
  quoteIcon,
  timeIcon,
  wordsIcon,
  zenIcon,
} from "@/shared/assets/svg/Change-modeSvg";

const WORD_OPTION: OptionValue[] = [10, 15, 25, 100];
const TIME_OPTION: OptionValue[] = [15, 30, 60, 120];
const QUOTE_OPTION: OptionValue[] = ["all", "short", "medium", "long", "huge"];

export const OPTIONS_BY_MODE: Record<Mode, OptionValue[]> = {
  words: WORD_OPTION,
  time: TIME_OPTION,
  quote: QUOTE_OPTION,
  zen: [],
};

export const BUTTON_CONFIG: Record<
  Mode,
  { label: string; icon: React.ReactNode }
> = {
  words: { label: "слова", icon: wordsIcon },
  time: { label: "время", icon: timeIcon },
  quote: { label: "цитаты", icon: quoteIcon },
  zen: { label: "дзен", icon: zenIcon },
};

export const OPTION_LABELS: Record<string, string> = {
  all: "все",
  short: "короткие",
  medium: "средние",
  long: "длинные",
  huge: "гигантские",
};
