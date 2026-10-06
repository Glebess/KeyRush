import { useEffect, useRef, useState } from "react";
import styles from "./ChangeLanguageTypingModal.module.css";
import { CONFIG_LANGUAGE } from "@/shared/assets/language/CONFIG_LANGUAGE";

export const ChangeLanguageTypingModal = () => {
  const [search, setSearch] = useState("");
  const searchLanguageInputRef = useRef<HTMLInputElement>(null);
  const filterLanguage = CONFIG_LANGUAGE.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    searchLanguageInputRef.current?.focus();
  });
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.search_container}>
          <div className={styles.svg_container}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div>
          <input
            ref={searchLanguageInputRef}
            placeholder="Язык..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        <div className={styles.languages_list_container}>
          {filterLanguage.map((item) => (
            <div key={item.label} className={styles.language_container}>
              <button>{item.label}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
