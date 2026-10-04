import { useEffect, useState, useRef } from "react";
import type { UseTimerProps } from "../model/types";

export const useTimer = ({
  isStarted,
  isEnded,
  duration,
  enabled,
  onTimeUp,
}: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    duration === 0 ? 0 : duration,
  );

  const onTimeUpRef = useRef(onTimeUp);
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (!enabled || !isStarted || isEnded) return;
    // Если duration === 0 таймер идет в обратную сторону
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (duration === 0) {
          return prev + 1;
        }

        if (prev <= 1) {
          clearInterval(interval);
          onTimeUpRef.current();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, isStarted, isEnded, duration]);

  return timeLeft;
};
