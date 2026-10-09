import { memo } from "react";
import type { TypedCharacter } from "@/entities/session";
import { Char } from "../Char/Char";
import styles from "../TypingBox.module.css";

interface WordProps {
  chars: TypedCharacter[];
  spaceChar?: TypedCharacter;
  isActive: boolean;
  hasError: boolean;
  isIncorrect: boolean;
  startIndex: number;
  currentIndex: number;
}

export const Word = memo(
  ({
    chars,
    spaceChar,
    isActive,
    hasError,
    isIncorrect,
    startIndex,
    currentIndex,
  }: WordProps) => {
    let wordClass = styles.word;

    if (isActive) {
      if (hasError) wordClass += ` ${styles.hasError}`;
    } else if (isIncorrect) {
      wordClass += ` ${styles.wordIncorrect}`;
    }

    const spaceIndex = startIndex + chars.length;

    return (
      <span className={styles.wordWrapper}>
        <span className={wordClass}>
          {chars.map((charObj, index) => {
            const globalIndex = startIndex + index;
            const isCaret = globalIndex === currentIndex;

            return <Char key={index} charObj={charObj} isCaret={isCaret} />;
          })}
        </span>

        {spaceChar && (
          <Char charObj={spaceChar} isCaret={spaceIndex === currentIndex} />
        )}
      </span>
    );
  },
);
