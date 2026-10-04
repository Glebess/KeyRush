import { useEffect, useState } from "react";
import type { UseTimerProps } from "../model/types";

export const useTimer = ({
  isStarted,
  isEnded,
  duration,
  enabled,
  onTimeUp,
}: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (!enabled || !isStarted || isEnded) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, isStarted, isEnded, onTimeUp]);
  return timeLeft;
};
