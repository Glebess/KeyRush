import styles from "./TypingBox.module.css";
interface TypingBoxProps {
  charStates: { char: string; state: "idle" | "correct" | "incorrect" }[];
  currentIndex: number;
}

export const TypingBox = ({ charStates, currentIndex }: TypingBoxProps) => {
  return (
    <div className={styles.container}>
      {charStates.map((item, index) => {
        const isCurrent = index === currentIndex;
        const charClass = `${styles.char} ${styles[item.state]} ${isCurrent ? styles.current : ""}`;
        return (
          <span key={index} className={charClass}>
            {item.char}
          </span>
        );
      })}
    </div>
  );
};
