import { useTypingEngine } from "@/entities/session";
import { TypingBox } from "@/widgets/typing-box";
import styles from "./TrainerPage.module.css";
const TEXT = "react typescript keyrush";
export const TrainerPage = () => {
  const { charStates, currentIndex } = useTypingEngine(TEXT);

  return (
    <div>
      <header className={styles.header}></header>
      <TypingBox charStates={charStates} currentIndex={currentIndex} />
    </div>
  );
};
