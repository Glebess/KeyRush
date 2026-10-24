import { useState } from "react";
import { Settings } from "lucide-react";
import styles from "./ChangeMode.module.css";
import { OPTIONS_BY_MODE, BUTTON_CONFIG, OPTION_LABELS } from "../model/Config"; // конфиги для отображения
import { xIcon } from "@/shared/assets/svg/Change-modeSvg";
import { CustomValueModal } from "./CustomValueModal/CustomValueModal";

import type {
  Mode,
  OptionValue,
  ModeSelectorKeyboardTrainerProps,
} from "../model/types";

export const ChangeMode: React.FC<ModeSelectorKeyboardTrainerProps> = ({
  mode = "words",
  onModeChange,
  onValueChange,
  selectedValue,
}) => {
  const currentOption = OPTIONS_BY_MODE[mode] || [];
  const isCustomModeSupported = mode === "words" || mode === "time";
  const isCustomValue =
    isCustomModeSupported && !currentOption.includes(selectedValue);

  const [isCustomValueModalOpen, setIsCustomValueModalOpen] =
    useState<boolean>(false);

  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

  const handleCustomSubmit = (customVal: number) => {
    onValueChange(customVal);
    setIsCustomValueModalOpen(false);
  };

  // Форматирование для цитат
  const formatOptionLabel = (val: OptionValue): string => {
    if (typeof val === "string" && OPTION_LABELS[val]) {
      return OPTION_LABELS[val];
    }
    return String(val);
  };

  const renderModeList = () => {
    return (
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
    );
  };

  const renderOptionsList = () => {
    return (
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
            <Settings size={20} />
          </button>
        )}
      </div>
    );
  };

  // Смена режима , языка текста , кол-во слов/времени , размер цитат
  return (
    <div className={styles.container}>
      <div className={styles.desktop_panel}>
        {renderModeList()}
        {currentOption.length > 0 && renderOptionsList()}
      </div>

      <button
        className={styles.mobile_open_button}
        onClick={() => setIsMobileModalOpen(true)}
      >
        Настройки теста
      </button>

      {isMobileModalOpen && (
        <div
          className={styles.container_mobile}
          onClick={() => setIsMobileModalOpen(false)}
        >
          <div
            className={styles.panel_mobile}
            onClick={(e) => e.stopPropagation()}
          >
            {renderModeList()}
            <div className={styles.line}></div>
            {renderOptionsList()}
          </div>
        </div>
      )}

      {isCustomValueModalOpen && (
        <CustomValueModal
          mode={mode}
          isOpen={isCustomValueModalOpen}
          onClose={() => setIsCustomValueModalOpen(false)}
          onSubmit={handleCustomSubmit}
        />
      )}
    </div>
  );
};
