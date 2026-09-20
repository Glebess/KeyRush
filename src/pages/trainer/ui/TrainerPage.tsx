import { TypingBox } from "@/widgets/typing-box";
import { generateText } from "@/entities/word-list";
import styles from "./TrainerPage.module.css";
import { useState } from "react";

import {
  ModeSelectorKeyboardTrainer,
  type Language,
  type OptionValue,
  type Mode,
} from "@/features/change-mode/ui/ModeSelectorKeyboardTrainer";
export const TrainerPage = () => {
  const [language, setLanguage] = useState<Language>("ru");
  const [selectedValue, setSelectedValue] = useState<OptionValue>(25);
  const [mode, setMode] = useState<Mode>("words");
  const text = generateText(language, selectedValue);

  const handleModeChange = (newMode: Mode): void => {
    setMode(newMode);
    setSelectedValue(newMode === "time" ? 30 : 25);
  };
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <ModeSelectorKeyboardTrainer
          language={language}
          onLanguageChange={setLanguage}
          mode={mode}
          onModeChange={handleModeChange}
        />
      </div>

      <div className={styles.typingWrapper}>
        <TypingBox text={text} key={text} />
      </div>
    </div>
  );
};
