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
  const [wordsCount, setWordsCount] = useState<OptionValue>(25);
  const [timeSecond, setTimeSecond] = useState<OptionValue>(30);
  const [mode, setMode] = useState<Mode>("words");

  const activeValue = mode === "words" ? wordsCount : timeSecond;
  const text = generateText(language, mode === "time" ? 100 : wordsCount);

  const handleModeChange = (newMode: Mode): void => {
    setMode(newMode);
  };
  const handleValueChange = (val: OptionValue): void => {
    if (mode === "time") {
      setTimeSecond(val);
    } else {
      setWordsCount(val);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <ModeSelectorKeyboardTrainer
          language={language}
          onLanguageChange={setLanguage}
          mode={mode}
          onModeChange={handleModeChange}
          onValueChange={handleValueChange}
          selectedValue={activeValue}
        />
      </div>

      <div className={styles.typingWrapper}>
        <TypingBox
          text={text}
          key={text}
          selectedMode={mode}
          timeLimit={timeSecond}
        />
      </div>
    </div>
  );
};
