/* Обработка keydown , заполнение массива charStates и подсчет общего количества промахов */

import { useState, useCallback, useEffect } from "react";
import type { TypedCharacter } from "../model/types";

export const useTypingInput = (targetText: string) => {
  const [charStates, setCharStates] = useState<TypedCharacter[]>(() =>
    targetText.split("").map((char) => ({ char, state: "idle" })),
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [totalMisses, setTotalMisses] = useState<number>(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey || isEnded) return;

      const key = e.key;

      if (!isStarted && key.length === 1) {
        setIsStarted(true);
      }

      if (key === "Backspace") {
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          setCurrentIndex(prevIndex);
          setCharStates((prev) => {
            const next = [...prev];
            next[prevIndex].state = "idle";
            return next;
          });
        }
        return;
      }

      // Обработка символьного ввода
      if (key.length === 1 && currentIndex < targetText.length) {
        if (key === " ") e.preventDefault();

        const isCorrect = key === targetText[currentIndex];

        setCharStates((prev) => {
          const next = [...prev];
          next[currentIndex].state = isCorrect ? "correct" : "incorrect";
          return next;
        });

        if (!isCorrect) {
          setTotalMisses((prev) => prev + 1);
        }

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);

        if (nextIndex === targetText.length) {
          setIsEnded(true);
        }
      }
    },
    [currentIndex, isStarted, isEnded, targetText],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    charStates,
    currentIndex,
    isStarted,
    isEnded,
    totalMisses,
  };
};
