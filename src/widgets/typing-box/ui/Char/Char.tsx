import { memo } from "react";
import type { TypedCharacter } from "@/entities/session";
import styles from "../TypingBox.module.css";

interface CharProps {
  charObj: TypedCharacter;
  isCaret?: boolean;
}

export const Char = memo(({ charObj, isCaret }: CharProps) => {
  let charClass = styles.char;

  if (charObj.state === "correct") {
    charClass += ` ${styles.correct}`;
  } else if (charObj.state === "incorrect") {
    charClass += ` ${styles.incorrect}`;
  }

  if (isCaret) {
    charClass += ` ${styles.current}`;
  }

  return <span className={charClass}>{charObj.char}</span>;
});
