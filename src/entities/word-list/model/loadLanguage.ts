const wordsCache: Record<string, string[]> = {};

// Автоматическая регистрация всех JSON-словарей через относительный путь
const dictionaryModules = import.meta.glob<{
  default: string[] | { words: string[] };
}>("../../../shared/assets/language/*.json");

export const loadLanguageWords = async (
  fileName: string,
): Promise<string[]> => {
  if (wordsCache[fileName]) {
    return wordsCache[fileName];
  }

  try {
    const key = `../../../shared/assets/language/${fileName}`;
    const loader = dictionaryModules[key];

    if (!loader) {
      console.error(`Файл словаря не найден по пути: ${key}`);
      return [];
    }

    const module = await loader();
    const rawData = module.default || module;
    const wordsList: string[] = Array.isArray(rawData)
      ? rawData
      : rawData.words || [];

    wordsCache[fileName] = wordsList;
    return wordsList;
  } catch (error) {
    console.error(`Ошибка загрузки словаря ${fileName}:`, error);
    return [];
  }
};

export const getRandomWordsFromPool = (
  wordsPool: string[],
  count: number,
): string => {
  if (!wordsPool || wordsPool.length === 0) return "";

  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordsPool.length);
    result.push(wordsPool[randomIndex]);
  }
  return result.join(" ");
};
