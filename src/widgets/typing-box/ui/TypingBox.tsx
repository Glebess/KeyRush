import { useTypingEngine } from "@/entities/session";
import styles from "./TypingBox.module.css";
import type { WordStatus, TypingBoxProps } from "../model/types";
export const TypingBox = ({ text }: TypingBoxProps) => {
  const { charStates, currentIndex } = useTypingEngine(text);
  const words = text.split(" ");

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
