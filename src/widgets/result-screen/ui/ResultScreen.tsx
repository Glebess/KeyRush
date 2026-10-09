import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { TypingStats, SecondSnapshot } from "@/entities/session";
import styles from "./ResultScreen.module.css";

interface ResultScreenProps {
  stats: TypingStats;
  history: SecondSnapshot[];
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  stats,
  history,
  onRestart,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onRestart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRestart]);

  return (
    <div className={styles.container}>
      <div className={styles.statsSummary}>
        <div className={styles.statGroupMain}>
          <span className={styles.label}>wpm</span>
          <span className={styles.valueMain}>{stats.wpm}</span>
        </div>

        <div className={styles.statGroupMain}>
          <span className={styles.label}>acc</span>
          <span className={styles.valueMain}>{stats.accuracy}%</span>
        </div>

        <div className={styles.subStats}>
          <div className={styles.statGroup}>
            <span className={styles.subLabel}>raw wpm</span>
            <span className={styles.subValue}>{stats.rawWpm}</span>
          </div>
          <div className={styles.statGroup}>
            <span className={styles.subLabel}>cpm</span>
            <span className={styles.subValue}>{stats.cpm}</span>
          </div>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={history}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="second"
              stroke="var(--sub-color, #646669)"
              tickLine={false}
            />
            <YAxis stroke="var(--sub-color, #646669)" tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--bg-color, #2c2e31)",
                borderColor: "var(--sub-color, #646669)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="wpm"
              stroke="var(--main-color, #2196f3)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="rawWpm"
              stroke="var(--sub-color, #646669)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.actions}>
        <button className={styles.restartBtn} onClick={onRestart} autoFocus>
          Новый тест (Enter)
        </button>
      </div>
    </div>
  );
};
