/**
 * @param correctChars - количество правильно набранных символов
 * @param totalTypedChars - общее кол-во нажатых клавиш (включая ошибки)
 * @param timeInSeconds - прошедшее время в секундах
 */

export const calculateTypingStats = (
  correctChars: number,
  totalTypedChars: number,
  timeInSeconds: number,
): TypingStats => {
  if (timeInSeconds <= 0) {
    return { wpm: 0, rawWpm: 0, accuracy: 100, cpm: 0 };
  }

  const timeInMinutes = timeInSeconds / 60;

  // Стандарт Monkeytype: 1 слово = 5 символов
  const netWords = correctChars / 5;
  const rawWords = totalTypedChars / 5;

  const wpm = Math.max(0, Math.round(netWords / timeInMinutes));
  const rawWpm = Math.max(0, Math.round(rawWords / timeInMinutes));
  const cpm = Math.max(0, Math.round(correctChars / timeInMinutes));

  const accuracy =
    totalTypedChars > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((correctChars / totalTypedChars) * 100)),
        )
      : 100;

  return { wpm, rawWpm, accuracy, cpm };
};
