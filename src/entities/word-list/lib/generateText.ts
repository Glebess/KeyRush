import { DICTIONARIES, type Language } from "../model/dictionaries";

export const generateText = (
  lang: Language = "ru",
  count: number = 10,
): string => {
  const dictionary = DICTIONARIES[lang];
  const resultGenerateText: string[] = [];
  // функция генерации текста для печати из словаря
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    resultGenerateText.push(dictionary[randomIndex]);
  }
  return resultGenerateText.join(" ");
};
