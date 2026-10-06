import { useEffect, useRef } from "react";
import { useTypingEngine } from "@/entities/session";
import { Word } from "./Word/Word";
import type { TypingBoxProps } from "../model/types";
import styles from "./TypingBox.module.css";

export const TypingBox = ({
  text,
  selectedMode,
  timeLimit,
  isInfinite = false,
  onLoadMore,
}: TypingBoxProps) => {
  const {
    words,
    charStates,
    currentIndex,
    currentWordIndex,
    wordStatuses,
    isCurrentWordHasError,
    timeLeft,
    isStarted,
  } = useTypingEngine(text, { mode: selectedMode, timeLimit });

  const boxRef = useRef<HTMLDivElement>(null);
  const totalWords = words.length;

  // Автоматическая подгрузка новых слов (только в бесконечном режиме)
  useEffect(() => {
    if (!isInfinite || !onLoadMore) return;

    if (totalWords - currentWordIndex < 15) {
      onLoadMore();
    }
  }, [currentWordIndex, totalWords, isInfinite, onLoadMore]);

  // Автоматический скролл — держит активную строку посередине
  useEffect(() => {
    if (!boxRef.current) return;

    const activeWordEl = boxRef.current.children[
      currentWordIndex
    ] as HTMLElement;
    if (!activeWordEl) return;

    const wordTop = activeWordEl.offsetTop;
    const lineHeight = activeWordEl.offsetHeight;

    if (wordTop >= lineHeight * 2) {
      boxRef.current.scrollTop = wordTop - lineHeight;
    } else {
      boxRef.current.scrollTop = 0;
    }
  }, [currentWordIndex]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.statsBar}>
        {isStarted && (
          <span>
            {selectedMode === "words"
              ? isInfinite
                ? `${currentWordIndex} / ∞`
                : `${currentWordIndex} / ${totalWords}`
              : `${timeLeft}s`}
          </span>
        )}
      </div>

      <div ref={boxRef} className={styles.box}>
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
