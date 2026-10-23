import { useState, useEffect, useCallback } from "react";
import { TypingBox } from "@/widgets/typing-box";
import { ResultScreen } from "@/widgets/result-screen/ui/ResultScreen";
import { MobileModeSelectorTrainer } from "@/features/change-mode";
import {
  loadLanguageWords,
  getRandomWordsFromPool,
} from "@/entities/word-list";
import { KeyboardLanguageSelectorSection } from "@/features/typing-language-switcher/ui/KeyboardLanguageSelectorSection";
import { CONFIG_LANGUAGE } from "@/shared/assets/language/CONFIG_LANGUAGE";
import type { LanguageConfig } from "@/shared/assets/language/CONFIG_LANGUAGE";
import type { TypingStats, SecondSnapshot } from "@/entities/session";
import {
  getRandomQuote,
  type Quote,
  type QuoteLengthCategory,
} from "@/entities/quote";
import {
  ModeSelectorKeyboardTrainer,
  type OptionValue,
  type Mode,
} from "@/features/change-mode/ui/ModeSelectorKeyboardTrainer";
import styles from "./TrainerPage.module.css";
import { RotateCcw } from "lucide-react";

export const TrainerPage = () => {
  const [selectedTypingLanguage, setSelectedTypingLanguage] =
    useState<LanguageConfig>(
      CONFIG_LANGUAGE[0] || {
        id: "russian",
        label: "Русский",
        baseLang: "ru",
        fileName: "russian.json",
      },
    );

  const [completedStats, setCompletedStats] = useState<{
    stats: TypingStats;
    history: SecondSnapshot[];
  } | null>(null);

  const [wordsCount, setWordsCount] = useState<OptionValue>(25);
  const [timeSecond, setTimeSecond] = useState<OptionValue>(30);
  const [quoteLength, setQuoteLength] = useState<OptionValue>("all");
  const [mode, setMode] = useState<Mode>("words");

  const [isModalChangeTypingLanguage, setIsModalChangeTypingLanguage] =
    useState<boolean>(false);

  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [currentWordsPool, setCurrentWordsPool] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [sessionKey, setSessionKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isModileSettingsOpen, setIsModileSettingsOpen] =
    useState<boolean>(false);

  const activeValue =
    mode === "words" ? wordsCount : mode === "time" ? timeSecond : quoteLength;

  const isInfinite = mode === "words" && Number(activeValue) === 0;
  const timeLimitNumber = Number(timeSecond) || 0;
  const wordsCountNumber = Number(wordsCount) || 0;

  const handleComplete = useCallback(
    async (stats: TypingStats, history: SecondSnapshot[]) => {
      setCompletedStats({ stats, history });

      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        console.log("Пользователь не авторизован, результат не сохранен в БД");
        return;
      }
      const user = JSON.parse(savedUser);

      try {
        await fetch("http://localhost:5000/api/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            wpm: Math.round(stats.wpm),
            accuracy: Math.round(stats.accuracy),
          }),
        });
        console.log("Результат сохранен в Бд");
      } catch (err) {
        console.error("Ошибка сохранения результат", err);
      }
    },
    [],
  );

  const handleRestart = useCallback(() => {
    setCompletedStats(null);
    setSessionKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadSessionData = async () => {
      setIsLoading(true);
      setCompletedStats(null);

      if (mode === "quote") {
        try {
          const category = (quoteLength as QuoteLengthCategory) || "all";
          const quote = await getRandomQuote(
            selectedTypingLanguage.baseLang,
            category,
          );

          if (isMounted) {
            setCurrentQuote(quote);
            setText(quote.text);
            setSessionKey((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Ошибка загрузки цитаты:", error);
        }
      } else {
        setCurrentQuote(null);

        const wordsPool = await loadLanguageWords(
          selectedTypingLanguage.fileName,
        );

        if (isMounted) {
          setCurrentWordsPool(wordsPool);

          const initialCount = isInfinite
            ? 50
            : mode === "time"
              ? Math.max(150, timeLimitNumber * 4)
              : wordsCountNumber;

          const generatedText = getRandomWordsFromPool(wordsPool, initialCount);
          setText(generatedText);
          setSessionKey((prev) => prev + 1);
        }
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadSessionData();

    return () => {
      isMounted = false;
    };
  }, [
    selectedTypingLanguage,
    mode,
    wordsCount,
    timeSecond,
    quoteLength,
    isInfinite,
  ]);

  const handleLoadMoreWords = useCallback(() => {
    if (mode === "words" && isInfinite && currentWordsPool.length > 0) {
      const newWords = getRandomWordsFromPool(currentWordsPool, 30);
      setText((prev) => `${prev} ${newWords}`);
    }
  }, [mode, isInfinite, currentWordsPool]);

  const handleValueChange = (val: OptionValue): void => {
    if (mode === "time") setTimeSecond(val);
    else if (mode === "words") setWordsCount(val);
    else if (mode === "quote") setQuoteLength(val);
  };

  return (
    <div className={styles.container}>
      <div className={styles.desktopTopBar}>
        <ModeSelectorKeyboardTrainer
          mode={mode}
          onModeChange={setMode}
          onValueChange={handleValueChange}
          selectedValue={activeValue}
        />
      </div>

      <div className={styles.mobileSettingsBar}>
        <button
          className={styles.settingsButton}
          onClick={() => setIsModileSettingsOpen(true)}
        >
          Настройки теста
        </button>
      </div>

      {isModileSettingsOpen && (
        <MobileModeSelectorTrainer
          mode={mode}
          onModeChange={setMode}
          onValueChange={handleValueChange}
          selectedValue={activeValue}
          onClose={() => setIsModileSettingsOpen(false)}
        />
      )}

      <div className={styles.typingWrapper}>
        <KeyboardLanguageSelectorSection
          isOpen={isModalChangeTypingLanguage}
          setIsModalChangeTypingLanguage={setIsModalChangeTypingLanguage}
          onClose={() => setIsModalChangeTypingLanguage(false)}
          onSelectLanguage={(langConfig) =>
            setSelectedTypingLanguage(langConfig)
          }
          selectedLanguage={selectedTypingLanguage}
        />
        {completedStats ? (
          <ResultScreen
            stats={completedStats.stats}
            history={completedStats.history}
            onRestart={handleRestart}
          />
        ) : isLoading ? (
          <div className={styles.loading}>Загрузка словаря...</div>
        ) : (
          <TypingBox
            key={sessionKey}
            text={text}
            selectedMode={mode === "time" ? "time" : "words"}
            timeLimit={timeLimitNumber}
            isInfinite={isInfinite}
            onLoadMore={handleLoadMoreWords}
            onComplete={handleComplete}
          />
        )}

        {!completedStats && mode === "quote" && currentQuote && !isLoading && (
          <div className={styles.quoteSource}>— {currentQuote.source}</div>
        )}
        {/* <div
          className={styles.container_restartTest}
          title="Перезапустить тест"
        >
          <button onClick={handleRestart}>
            <RotateCcw />
          </button>
        </div> */}
      </div>
    </div>
  );
};
