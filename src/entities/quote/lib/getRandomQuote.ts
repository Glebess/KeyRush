// src/entities/quote/lib/getRandomQuote.ts
import type { Quote, QuoteLengthCategory } from "../model/types";

const LENGTH_RANGES: Record<
  Exclude<QuoteLengthCategory, "all">,
  { min: number; max: number }
> = {
  short: { min: 0, max: 100 },
  medium: { min: 101, max: 250 },
  long: { min: 251, max: 400 },
  huge: { min: 401, max: 99999 },
};

const quotesCache: Record<string, Quote[]> = {};

export const getRandomQuote = async (
  language: "ru" | "en",
  lengthCategory: QuoteLengthCategory = "all",
): Promise<Quote> => {
  if (!quotesCache[language]) {
    const module =
      language === "ru"
        ? await import("@/shared/assets/quotes/russian.json")
        : await import("@/shared/assets/quotes/english.json");

    const rawData = module.default || module;

    const quotesList: Quote[] = Array.isArray(rawData)
      ? rawData
      : rawData.quotes || [];

    quotesCache[language] = quotesList;
  }

  const list = quotesCache[language];

  const filtered =
    lengthCategory === "all"
      ? list
      : list.filter((q) => {
          const range = LENGTH_RANGES[lengthCategory];
          if (!range) return true;
          return q.length >= range.min && q.length <= range.max;
        });

  const pool = filtered.length > 0 ? filtered : list;

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};
