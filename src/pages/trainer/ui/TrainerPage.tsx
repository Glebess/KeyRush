import { useTypingEngine } from "@/entities/session";
import { TypingBox } from "@/widgets/typing-box";
import { generateText } from "@/entities/word-list";
import styles from "./TrainerPage.module.css";
import { useState } from "react";

import {
  ModeSelectorKeyboardTrainer,
  type Language,
  type Mode,
  type OptionValue,
} from "@/features/change-mode/ui/ModeSelectorKeyboardTrainer";
//const TEXT = "react typescript keyrush";
export const TrainerPage = () => {
  const [language, setLanguage] = useState<Language>("ru");
  const [selectedValue, setSelectedValue] = useState<OptionValue>(25);
  const [text, setText] = useState(() => generateText("ru", 15));
  const { charStates, currentIndex, incorrectCount, isEnded } =
    useTypingEngine(text);

  // Функция смены языка текста печати
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLanguage(generateText(language, selectedValue));
  };
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <ModeSelectorKeyboardTrainer
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      <div className={styles.typingWrapper}>
        <TypingBox charStates={charStates} currentIndex={currentIndex} />
      </div>
    </div>
  );
};
