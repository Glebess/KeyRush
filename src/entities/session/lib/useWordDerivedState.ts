import { useMemo } from "react";
import type { TypedCharacter, WordStatus, WordRange } from "../model/types";

export const useWordDerivedState = (
  targetText: string,
  currentIndex: number,
  charStates: TypedCharacter[],
) => {
  // Вычисляем границы слов
  const words = useMemo<WordRange[]>(() => {
    return targetText.split(" ").reduce<WordRange[]>((acc, word) => {
      const lastWord = acc[acc.length - 1];
      const startIndex = lastWord ? lastWord.endIndex + 2 : 0; // +1 на символ и +1 на пробел
      const endIndex = startIndex + word.length - 1;

      acc.push({ word, startIndex, endIndex });
      return acc;
    }, []);
  }, [targetText]);

  // Индекс активного слова
  const currentWordIndex = useMemo(() => {
    const index = words.findIndex(
      (w) => currentIndex >= w.startIndex && currentIndex <= w.endIndex + 1,
    );
    return index !== -1 ? index : words.length - 1;
  }, [words, currentIndex]);

  // Статусы слов (pending, current, correct, incorrect)
  const wordStatuses = useMemo<WordStatus[]>(() => {
    return words.map((w, index) => {
      if (index > currentWordIndex) return "pending";
      if (index === currentWordIndex) return "current";

      const hasError = charStates
        .slice(w.startIndex, w.endIndex + 1)
        .some((c) => c.state === "incorrect" || c.state === "idle");

      return hasError ? "incorrect" : "correct";
    });
  }, [words, currentWordIndex, charStates]);

  // Есть ли ошибка в текущем набираемом слове прямо сейчас
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

  return {
    words,
    currentWordIndex,
    wordStatuses,
    isCurrentWordHasError,
  };
};
