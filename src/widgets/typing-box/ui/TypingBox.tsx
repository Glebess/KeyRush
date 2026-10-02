import { useTypingEngine } from "@/entities/session";
import { Word } from "./Word/Word";
import type { TypingBoxProps } from "../model/types";
import styles from "./TypingBox.module.css";

export const TypingBox = ({ text }: TypingBoxProps) => {
  const {
    words,
    charStates,
    currentIndex,
    currentWordIndex,
    wordStatuses,
    isCurrentWordHasError,
  } = useTypingEngine(text);

  const totalWords = words.length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.statsBar}>
        <span>
          Слова: {currentWordIndex} / {totalWords}
        </span>
      </div>

      <div className={styles.box}>
        {words.map((w, index) => {
          const isActive = index === currentWordIndex;
          const isIncorrect =
            index < currentWordIndex && wordStatuses[index] === "incorrect";

          const wordChars = charStates.slice(w.startIndex, w.endIndex + 1);

          const spaceChar = charStates[w.endIndex + 1];

          return (
            <Word
              key={index}
              chars={wordChars}
              spaceChar={spaceChar}
              isActive={isActive}
              hasError={isActive && isCurrentWordHasError}
              isIncorrect={isIncorrect}
              startIndex={w.startIndex}
              currentIndex={currentIndex}
            />
          );
        })}
      </div>
    </div>
  );
};
