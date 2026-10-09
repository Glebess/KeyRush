import { useState, useEffect, useCallback } from "react";
import { TypingBox } from "@/widgets/typing-box";
import { ResultScreen } from "@/widgets/result-screen/ui/ResultScreen";
import {
  loadLanguageWords,
  getRandomWordsFromPool,
} from "@/entities/word-list";
import { translateIcon } from "@/shared/assets/svg/TrainerPageSvg";
import { ChangeLanguageTypingModal } from "./ChangeLanguageTypingModal/ChangeLanguageTypingModal";
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

export const TrainerPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageConfig>(
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

  const activeValue =
    mode === "words" ? wordsCount : mode === "time" ? timeSecond : quoteLength;

  const isInfinite = mode === "words" && Number(activeValue) === 0;
  const timeLimitNumber = Number(timeSecond) || 0;
  const wordsCountNumber = Number(wordsCount) || 0;

  const handleComplete = useCallback(
    (stats: TypingStats, history: SecondSnapshot[]) => {
      setCompletedStats({ stats, history });
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
            selectedLanguage.baseLang,
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

        const wordsPool = await loadLanguageWords(selectedLanguage.fileName);

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
  }, [selectedLanguage, mode, wordsCount, timeSecond, quoteLength, isInfinite]);

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
      <div className={styles.topBar}>
        <ModeSelectorKeyboardTrainer
          mode={mode}
          onModeChange={setMode}
          onValueChange={handleValueChange}
          selectedValue={activeValue}
        />
      </div>

      <div className={styles.typingWrapper}>
        {isModalChangeTypingLanguage && (
          <ChangeLanguageTypingModal
            selectedId={selectedLanguage.id}
            onClose={() => setIsModalChangeTypingLanguage(false)}
            onSelectLanguage={(langConfig) => setSelectedLanguage(langConfig)}
          />
        )}

        <div className={styles.language} title="Выбрать язык печати">
          <button onClick={() => setIsModalChangeTypingLanguage(true)}>
            {translateIcon}
            <span>{selectedLanguage.label}</span>
          </button>
        </div>

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
      </div>
    </div>
  );
};
