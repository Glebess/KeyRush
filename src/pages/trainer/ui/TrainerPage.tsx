import { useTypingEngine } from "@/entities/session";
import { TypingBox } from "@/widgets/typing-box";

const TEXT = "react typescript keyrush";
export const TrainerPage = () => {
  const { charStates, currentIndex } = useTypingEngine(TEXT);
  return (
    <main
      style={{ padding: "40px", display: "flex", justifyContent: "center" }}
    >
      <TypingBox charStates={charStates} currentIndex={currentIndex} />
    </main>
  );
};
