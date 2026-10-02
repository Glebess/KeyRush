// подсчет статистики теста
import { useMemo } from "react";
import type { TypedCharacter, TypingStats } from "../model/types";

export const useTypingStats = (
  charStates: TypedCharacter[],
  totalMisses: number,
): TypingStats => {
  return useMemo(() => {
    let correctChars = 0;
    let correctSpaces = 0;
    let uncorrectedErrors = 0;

    for (const c of charStates) {
      if (c.state === "correct") {
        if (c.char === " ") {
          correctSpaces++;
        } else {
          correctChars++;
        }
      } else if (c.state === "incorrect") {
        uncorrectedErrors++;
      }
    }

    return {
      correctChars,
      correctSpaces,
      uncorrectedErrors,
      totalMisses,
    };
  }, [charStates, totalMisses]);
};
