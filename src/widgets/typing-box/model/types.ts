import type { Mode } from "@/features/change-mode";

export interface TypingBoxProps {
  text: string;
  onComplete?: () => void;
  selectedMode: Mode;
  timeLimit: number;
  onLoadMore?: () => void;
  isInfinite: boolean;
}
