import { useState, useEffect, useCallback } from "react";
import { TypingBox } from "@/widgets/typing-box";
import { generateText } from "@/entities/word-list";
import { translateIcon } from "@/shared/assets/svg/TrainerPageSvg";
import { ChangeLanguageTypingModal } from "./ChangeLanguageTypingModal/ChangeLanguageTypingModal";
import {
  getRandomQuote,
  type Quote,
  type QuoteLengthCategory,
} from "@/entities/quote";
import {
  ModeSelectorKeyboardTrainer,
  type Language,
  type OptionValue,
  type Mode,
} from "@/features/change-mode/ui/ModeSelectorKeyboardTrainer";
import styles from "./TrainerPage.module.css";

export const TrainerPage = () => {
  const [language, setLanguage] = useState<Language>("ru");
  const [wordsCount, setWordsCount] = useState<OptionValue>(25);
  const [timeSecond, setTimeSecond] = useState<OptionValue>(30);
  const [quoteLength, setQuoteLength] = useState<OptionValue>("all");
  const [mode, setMode] = useState<Mode>("words");

  const [isModalChangeTypingLanguage, setIsModalChangeTypingLanguage] =
    useState<boolean>(false);

  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [text, setText] = useState<string>("");
  const [sessionKey, setSessionKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activeValue =
    mode === "words" ? wordsCount : mode === "time" ? timeSecond : quoteLength;

  const isInfinite = mode === "words" && Number(activeValue) === 0;
  const timeLimitNumber = Number(timeSecond) || 0;
  const wordsCountNumber = Number(wordsCount) || 0;

  // Автоматическая загрузка нового текста/цитаты при смене настроек
  useEffect(() => {
    let isMounted = true;

    const loadSessionData = async () => {
      setIsLoading(true);

      if (mode === "quote") {
        try {
          const category = (quoteLength as QuoteLengthCategory) || "all";
          const quote = await getRandomQuote(language, category);

          if (isMounted) {
            setCurrentQuote(quote);
            setText(quote.text);
            setSessionKey((prev) => prev + 1);
          }
        } catch (error) {
          console.error("Ошибка при подгрузке цитаты:", error);
        }
      } else {
        setCurrentQuote(null);
        const initialCount = isInfinite
          ? 50
          : mode === "time"
            ? Math.max(150, timeLimitNumber * 4)
            : wordsCountNumber;

        const generated = generateText(language, initialCount);
        if (isMounted) {
          setText(generated);
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
  }, [language, mode, wordsCount, timeSecond, quoteLength, isInfinite]);

  // Дозагрузка слов для бесконечного режима
  const handleLoadMoreWords = useCallback(() => {
    if (mode === "words" && isInfinite) {
      setText((prevText) => `${prevText} ${generateText(language, 30)}`);
    }
  }, [language, mode, isInfinite]);

  const handleValueChange = (val: OptionValue): void => {
    if (mode === "time") setTimeSecond(val);
    else if (mode === "words") setWordsCount(val);
    else if (mode === "quote") setQuoteLength(val);
  };
  const handleLanguageTypingOpen = () => {
    setIsModalChangeTypingLanguage(!isModalChangeTypingLanguage);
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
        {isModalChangeTypingLanguage && <ChangeLanguageTypingModal />}
        <div className={styles.language} title="выбрать язык печати">
          <button onClick={() => handleLanguageTypingOpen()}>
            {translateIcon}
            {language}
          </button>
        </div>
        <TypingBox
          key={sessionKey}
          text={text}
          selectedMode={mode === "time" ? "time" : "words"}
          timeLimit={timeLimitNumber}
          isInfinite={isInfinite}
          onLoadMore={handleLoadMoreWords}
        />

        {mode === "quote" && currentQuote && !isLoading && (
          <div className={styles.quoteSource}>— {currentQuote.source}</div>
        )}
      </div>
    </div>
  );
};
