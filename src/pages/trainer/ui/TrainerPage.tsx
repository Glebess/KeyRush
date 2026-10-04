import { useState, useCallback } from "react";
import { TypingBox } from "@/widgets/typing-box";
import { generateText } from "@/entities/word-list";
import {
  ModeSelectorKeyboardTrainer,
  type Language,
  type OptionValue,
  type Mode,
} from "@/features/change-mode/ui/ModeSelectorKeyboardTrainer";
import styles from "./TrainerPage.module.css";

export const TrainerPage = () => {
  const [language, setLanguage] = useState<Language>("ru");
  const [wordsCount, setWordsCount] = useState<OptionValue>(25);
  const [timeSecond, setTimeSecond] = useState<OptionValue>(30);
  const [mode, setMode] = useState<Mode>("words");

  const activeValue = mode === "words" ? wordsCount : timeSecond;

  const isInfinite = Number(activeValue) === 0;

  const timeLimitNumber = Number(timeSecond) || 0;
  const wordsCountNumber = Number(wordsCount) || 0;

  const initialCount = isInfinite
    ? 50
    : mode === "time"
      ? Math.max(150, timeLimitNumber * 4)
      : wordsCountNumber;

  const currentConfigKey = `${language}-${mode}-${wordsCountNumber}-${timeLimitNumber}-${isInfinite}`;

  const [prevConfigKey, setPrevConfigKey] = useState(currentConfigKey);
  const [text, setText] = useState(() => generateText(language, initialCount));
  const [sessionKey, setSessionKey] = useState(0);

  if (prevConfigKey !== currentConfigKey) {
    setPrevConfigKey(currentConfigKey);
    setText(generateText(language, initialCount));
    setSessionKey((prev) => prev + 1);
  }

  const handleLoadMoreWords = useCallback(() => {
    setText((prevText) => `${prevText} ${generateText(language, 30)}`);
  }, [language]);

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
          key={sessionKey}
          text={text}
          selectedMode={mode}
          timeLimit={timeLimitNumber}
          isInfinite={isInfinite}
          onLoadMore={handleLoadMoreWords}
        />
      </div>
    </div>
  );
};
