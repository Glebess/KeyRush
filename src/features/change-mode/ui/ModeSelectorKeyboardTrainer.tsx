import { useState } from "react";
import { Settings } from "lucide-react";
import { CustomValueModal } from "./CustomValueModal/CustomValueModal";
import { quoteIcon, timeIcon, wordsIcon, zenIcon } from "./Svg";
import styles from "./ModeSelectorKeyboardTrainer.module.css";
import type {
  Mode,
  OptionValue,
  ModeSelectorKeyboardTrainerProps,
} from "../model/types";

const WORD_OPTION: OptionValue[] = [10, 15, 25, 100];
const TIME_OPTION: OptionValue[] = [15, 30, 60, 120];
const QUOTE_OPTION: OptionValue[] = ["all", "short", "medium", "long", "huge"];

const OPTIONS_BY_MODE: Record<Mode, OptionValue[]> = {
  words: WORD_OPTION,
  time: TIME_OPTION,
  quote: QUOTE_OPTION,
  zen: [],
};

const BUTTON_CONFIG: Record<Mode, { label: string; icon: React.ReactNode }> = {
  words: { label: "слова", icon: wordsIcon },
  time: { label: "время", icon: timeIcon },
  quote: { label: "цитаты", icon: quoteIcon },
  zen: { label: "дзен", icon: zenIcon },
};

const OPTION_LABELS: Record<string, string> = {
  all: "все",
  short: "короткие",
  medium: "средние",
  long: "длинные",
  huge: "гигантские",
};

export const ModeSelectorKeyboardTrainer: React.FC<
  ModeSelectorKeyboardTrainerProps
> = ({ mode = "words", onModeChange, onValueChange, selectedValue }) => {
  const currentOption = OPTIONS_BY_MODE[mode] || [];
  const isCustomModeSupported = mode === "words" || mode === "time";
  const isCustomValue =
    isCustomModeSupported && !currentOption.includes(selectedValue);

  const [isCustomValueModalOpen, setIsCustomValueModalOpen] =
    useState<boolean>(false);

  const handleCustomSubmit = (customVal: number) => {
    onValueChange(customVal);
    setIsCustomValueModalOpen(false);
  };

  const formatOptionLabel = (val: OptionValue): string => {
    if (typeof val === "string" && OPTION_LABELS[val]) {
      return OPTION_LABELS[val];
    }
    return String(val);
  };

  return (
    <>
      <div className={styles.panel}>
        {/* Режимы */}
        {onModeChange && (
          <>
            <div className={styles.group}>
              {(Object.keys(BUTTON_CONFIG) as Mode[]).map((m) => {
                const { label, icon } = BUTTON_CONFIG[m];
                return (
                  <button
                    key={m}
                    type="button"
                    className={`${styles.btn} ${mode === m ? styles.active : ""}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onModeChange(m)}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Опции текущего режима */}
        {currentOption.length > 0 && (
          <>
            <div className={styles.group}>
              {currentOption.map((val) => (
                <button
                  key={String(val)}
                  type="button"
                  className={`${styles.btn} ${selectedValue === val ? styles.active : ""}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onValueChange(val)}
                >
                  {formatOptionLabel(val)}
                </button>
              ))}

              {isCustomModeSupported && (
                <button
                  type="button"
                  className={`${styles.btn} ${isCustomValue ? styles.active : ""}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setIsCustomValueModalOpen((prev) => !prev)}
                  title="Задать свое значение"
                >
                  <Settings size={22} />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {isCustomValueModalOpen && (
        <CustomValueModal
          mode={mode}
          isOpen={isCustomValueModalOpen}
          onClose={() => setIsCustomValueModalOpen(false)}
          onSubmit={handleCustomSubmit}
        />
      )}
    </>
  );
};
