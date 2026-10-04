// src/entities/session/lib/useTypingEngine.ts
import { useTypingInput } from "./useTypingInput";
import { useWordDerivedState } from "./useWordDerivedState";
import { useTypingStats } from "./useTypingStats";
import { useTimer } from "./useTimer";
import type { TypingEngineOptions } from "../model/types";

export const useTypingEngine = (
  targetText: string,
  options: TypingEngineOptions = {},
) => {
  const { mode = "words", timeLimit = 30 } = options;

  const {
    charStates,
    currentIndex,
    isStarted,
    isEnded,
    totalMisses,
    finishSession,
  } = useTypingInput(targetText);

  const timeLeft = useTimer({
    isStarted,
    isEnded,
    duration: timeLimit,
    enabled: mode === "time",
    onTimeUp: finishSession,
  });

  const { words, currentWordIndex, wordStatuses, isCurrentWordHasError } =
    useWordDerivedState(targetText, currentIndex, charStates);

  const stats = useTypingStats(charStates, totalMisses);

  return {
    charStates,
    currentIndex,
    isStarted,
    isEnded,
    words,
    currentWordIndex,
    wordStatuses,
    isCurrentWordHasError,
    stats,
    timeLeft,
    mode,
  };
};
