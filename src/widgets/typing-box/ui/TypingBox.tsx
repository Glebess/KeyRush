import { useTypingEngine } from "@/entities/session";
import styles from "./TypingBox.module.css";

interface TypingBoxProps {
  text: string;
}

export const TypingBox = ({ text }: TypingBoxProps) => {
  const { charStates, currentIndex } = useTypingEngine(text);

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
