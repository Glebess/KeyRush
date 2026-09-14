import { useTypingEngine } from "@/entities/session";
import { TypingBox } from "@/widgets/typing-box";
import styles from "./TrainerPage.module.css";
const TEXT = "react typescript keyrush";
export const TrainerPage = () => {
  const { charStates, currentIndex, incorrectCount, isEnded } =
    useTypingEngine(TEXT);

  return (
    <div className={styles.container}>
      <p>{isEnded && `Ошибок: ${incorrectCount}`}</p>
      <TypingBox charStates={charStates} currentIndex={currentIndex} />
    </div>
  );
};
