// статус отдельного символа в тексте
export type CharacterState = "idle" | "correct" | "incorrect";

// Структрура для хранения информации о символе и его статусе
export interface TypedCharacter {
  char: string;
  state: CharacterState;
}

//Режим сессии
export type SessionMode = "time" | "words" | "quote";
export type TimeOption = 15 | 30 | 60 | 120;

// Структура для хранения информации о сессии
export interface SessionStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errorCount: number;
  totalTyped: number;
}
