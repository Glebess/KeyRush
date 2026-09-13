import type { TypedCharacter } from "../model/types";
import { useState, useCallback, useEffect } from "react";

export const useTypingEngine = (targetText: string) => {
  // Состояние для хранения информации о каждом символе в тексте
  const [charStates, setCharStates] = useState<TypedCharacter[]>(() => {
    return targetText.split("").map((char) => ({ char, state: "idle" }));
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Игнорируем сочетания клавиш с Ctrl, Alt, Meta и не обрабатываем ввод, если сессия завершена
      if (e.ctrlKey || e.altKey || e.metaKey || isEnded) return;

      const key = e.key;

      // Стартуем сессию при первом нажатии печатного символа
      if (!isStarted && key.length === 1) {
        setIsStarted(true);
      }

      // Обработка нажатия клавиши Backspace
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
      // Обработка обычного печатного символа
      if (key.length === 1 && currentIndex < targetText.length) {
        if (key === " ") {
          e.preventDefault(); // Предотвращаем скролл страницы от пробела
        }

        const isCorrect = key === targetText[currentIndex];

        setCharStates((prevStates) => {
          const next = [...prevStates];
          next[currentIndex].state = isCorrect ? "correct" : "incorrect";
          return next;
        });

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);

        if (nextIndex === targetText.length) {
          setIsEnded(true);
        }
      }
    },
    [currentIndex, isStarted, isEnded, targetText],
  );

  // Добавление и очистка слушателя событий клавиатуры
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    charStates,
    currentIndex,
    isStarted,
    isEnded,
  };
};
