import { useTypingEngine } from "@/entities/session";
import { TypingBox } from "@/widgets/typing-box";
import { generateText } from "@/entities/word-list";
import styles from "./TrainerPage.module.css";
import { useEffect, useState } from "react";

import {
  ModeSelectorKeyboardTrainer,
  type Language,
  type Mode,
  type OptionValue,
} from "@/features/change-mode/ui/ModeSelectorKeyboardTrainer";
export const TrainerPage = () => {
  const [language, setLanguage] = useState<Language>("ru");
  const [selectedValue, setSelectedValue] = useState<OptionValue>(25);
  const text = generateText(language, selectedValue);
  console.log(language);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <ModeSelectorKeyboardTrainer
          language={language}
          onLanguageChange={setLanguage}
        />
      </div>

      <div className={styles.typingWrapper}>
        <TypingBox text={text} key={text} />
      </div>
    </div>
  );
};
