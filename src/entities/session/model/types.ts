// статус отдельного символа в тексте
export type CharacterState = "idle" | "correct" | "incorrect";

// статус тренажера в целом
export type TrainerStatus = "paused" | "inProgress" | "isEnded";

// Структрура для хранения информации о символе и его статусе
export interface TypedCharacter {
  char: string;
  state: CharacterState;
}
export type wordStatus = "pending" | "correct" | "incorrect" | "current";
