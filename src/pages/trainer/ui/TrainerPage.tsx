import { useTypingEngine } from "@/entities/session";
import { TypingBox } from "@/widgets/typing-box";
import { generateText } from "@/entities/word-list";
import styles from "./TrainerPage.module.css";
import { useState } from "react";
import { ModeSelectorKeyboardTrainer } from "@/features/change-mode/ui/ModeSelectorKeyboardTrainer";
//const TEXT = "react typescript keyrush";
export const TrainerPage = () => {
  const [text, setText] = useState(() => generateText("ru", 15));
  const { charStates, currentIndex, incorrectCount, isEnded } =
    useTypingEngine(text);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <ModeSelectorKeyboardTrainer />
      </div>

      <div className={styles.typingWrapper}>
        <TypingBox charStates={charStates} currentIndex={currentIndex} />
      </div>
    </div>
  );
};
