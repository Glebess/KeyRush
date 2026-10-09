import { useState, useEffect, useMemo, useRef } from "react";
import { calculateTypingStats } from "./stats";
import type {
  TypedCharacter,
  SecondSnapshot,
  TypingMode,
} from "../model/types";

interface UseTypingStatsProps {
  charStates: TypedCharacter[];
  totalMisses: number;
  isStarted: boolean;
  isEnded: boolean;
  mode: TypingMode;
  timeLimit: number;
  timeLeft: number;
}

export const useTypingStats = ({
  charStates,
  totalMisses,
  isStarted,
  isEnded,
  mode,
  timeLimit,
  timeLeft,
}: UseTypingStatsProps) => {
  const [history, setHistory] = useState<SecondSnapshot[]>([]);
  const [wordsModeElapsedSeconds, setWordsModeElapsedSeconds] = useState(0);

  // Подсчёт времени для режимов "words" и "quote"
  useEffect(() => {
    if (!isStarted || isEnded) return;

    if (mode !== "time") {
      const interval = setInterval(() => {
        setWordsModeElapsedSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isStarted, isEnded, mode]);

  // Вычисление прошедшего времени в секундах
  const elapsedSeconds =
    mode === "time" ? timeLimit - timeLeft : wordsModeElapsedSeconds;

  const correctChars = useMemo(
    () => charStates.filter((c) => c.state === "correct").length,
    [charStates],
  );

  const totalTypedChars = correctChars + totalMisses;

  const stats = useMemo(() => {
    return calculateTypingStats(correctChars, totalTypedChars, elapsedSeconds);
  }, [correctChars, totalTypedChars, elapsedSeconds]);

  // Сохранение свежих данных в Ref, чтобы интервал всегда видел актуальные значения без постоянного пересоздания
  const latestDataRef = useRef({ charStates, totalTypedChars, elapsedSeconds });
  useEffect(() => {
    latestDataRef.current = { charStates, totalTypedChars, elapsedSeconds };
  }, [charStates, totalTypedChars, elapsedSeconds]);

  // Запись снимка истории каждую секунду внутри асинхронного таймера
  useEffect(() => {
    if (!isStarted || isEnded) return;

    const interval = setInterval(() => {
      const {
        charStates: currentChars,
        totalTypedChars: currentTotal,
        elapsedSeconds: currentElapsed,
      } = latestDataRef.current;

      if (currentElapsed > 0) {
        const correct = currentChars.filter(
          (c) => c.state === "correct",
        ).length;
        const snapshotStats = calculateTypingStats(
          correct,
          currentTotal,
          currentElapsed,
        );
        const errorsCount = currentChars.filter(
          (c) => c.state === "incorrect",
        ).length;

        setHistory((prev) => {
          if (prev.some((item) => item.second === currentElapsed)) return prev;
          return [
            ...prev,
            {
              second: currentElapsed,
              wpm: snapshotStats.wpm,
              rawWpm: snapshotStats.rawWpm,
              errors: errorsCount,
            },
          ];
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isEnded]);

  return { stats, history };
};
