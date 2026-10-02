import { useTypingInput } from "./useTypingInput";
import { useWordDerivedState } from "./useWordDerivedState";
import { useTypingStats } from "./useTypingStats";

export const useTypingEngine = (targetText: string) => {
  const { charStates, currentIndex, isStarted, isEnded, totalMisses } =
    useTypingInput(targetText);

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
  };
};
