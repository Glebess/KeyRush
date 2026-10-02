import { useTypingEngine } from "@/entities/session";
import styles from "./TypingBox.module.css";
import type { TypingBoxProps } from "../model/types";
export const TypingBox = ({ text }: TypingBoxProps) => {
  const {
    words,
    charStates,
    currentIndex,
    currentWordIndex,
    wordStatuses,
    isCurrentWordHasError,
    stats,
  } = useTypingEngine(text);

  const totalWords = words.length;
  return (
    <div className={styles.box}>
      {charStates.map((item, index) => (
        <span
          key={index}
          className={`${styles.char} ${styles[item.state]} ${
            index === currentIndex ? styles.current : ""
          }`}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
};
