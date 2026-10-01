import { useState, useCallback, useEffect, useMemo } from "react";
import type { TypedCharacter } from "../model/types";

export type WordStatus = "pending" | "current" | "correct" | "incorrect";

export const useTypingEngine = (targetText: string) => {
  const [charStates, setCharStates] = useState<TypedCharacter[]>(() =>
    targetText.split("").map((char) => ({ char, state: "idle" })),
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  // Разбиваем текст на слова
  const words = useMemo(() => {
    return targetText
      .split(" ")
      .reduce<
        { word: string; startIndex: number; endIndex: number }[]
      >((acc, word) => {
        const lastWord = acc[acc.length - 1];
        const startIndex = lastWord ? lastWord.endIndex + 2 : 0;
        const endIndex = startIndex + word.length - 1;

        acc.push({ word, startIndex, endIndex });
        return acc;
      }, []);
  }, [targetText]);

  // Определяем, какое слово сейчас активно
  const currentWordIndex = useMemo(() => {
    const index = words.findIndex(
      (w) => currentIndex >= w.startIndex && currentIndex <= w.endIndex + 1,
    );
    return index !== -1 ? index : words.length - 1;
  }, [words, currentIndex]);

  // Присваиваем статусы уже пройденным словам
  const wordStatuses = useMemo<WordStatus[]>(() => {
    return words.map((w, index) => {
      if (index > currentWordIndex) return "pending";
      if (index === currentWordIndex) return "current";

      //Если в одном символе ошибка - все слово считается ошибочным
      const hasError = charStates
        .slice(w.startIndex, w.endIndex + 1)
        .some((c) => c.state === "incorrect" || c.state === "idle");

      return hasError ? "incorrect" : "correct";
    });
  }, [words, currentWordIndex, charStates]);

  // Подсветка текущего слова при опечатке
  const isCurrentWordHasError = useMemo(() => {
    const currentWord = words[currentWordIndex];
    if (!currentWord) return false;

    return charStates
      .slice(
        currentWord.startIndex,
        Math.min(currentIndex, currentWord.endIndex + 1),
      )
      .some((c) => c.state === "incorrect");
  }, [words, currentWordIndex, currentIndex, charStates]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey || isEnded) return;

      const key = e.key;

      if (!isStarted && key.length === 1) setIsStarted(true);

      // Логика стирания
      if (key === "Backspace") {
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          setCurrentIndex(prevIndex);
          setCharStates((prevStates) => {
            const next = [...prevStates];
            next[prevIndex].state = "idle";
            return next;
          });
        }
        return;
      }

      // Логика ввода
      if (key.length === 1 && currentIndex < targetText.length) {
        if (key === " ") e.preventDefault();

        const isCorrect = key === targetText[currentIndex];

        setCharStates((prevStates) => {
          const next = [...prevStates];
          next[currentIndex].state = isCorrect ? "correct" : "incorrect";
          return next;
        });

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);

        if (nextIndex === targetText.length) setIsEnded(true);
      }
    },
    [currentIndex, isStarted, isEnded, targetText],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    words,
    charStates,
    currentWordIndex,
    wordStatuses,
    isCurrentWordHasError,
  };
};
