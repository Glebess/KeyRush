// статус отдельного символа в тексте
export type CharacterState = "idle" | "correct" | "incorrect";

// статус тренажера в целом
export type TrainerStatus = "paused" | "inProgress" | "isEnded";

export interface WordRange {
  word: string;
  startIndex: number;
  endIndex: number;
}
export interface TypingStats {
  correctChars: number;
  correctSpaces: number;
  uncorrectedErrors: number;
  totalMisses: number;
}
// Структрура для хранения информации о символе и его статусе
export interface TypedCharacter {
  char: string;
  state: CharacterState;
}
export type WordStatus = "pending" | "correct" | "incorrect" | "current";

export interface UseTimerProps {
  isStarted: boolean;
  isEnded: boolean;
  duration: number;
  enabled: boolean;
  onTimeUp: () => void;
}

export type TypingMode = "words" | "time";
export interface TypingEngineOptions {
  mode?: TypingMode;
  timeLimit?: number;
}
