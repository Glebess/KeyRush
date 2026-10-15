import React from "react";
import styles from "./MainLayout.module.css";
import { useNavigate } from "react-router-dom";
interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigateToLogin = useNavigate();
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span>K</span>
          <span>ey</span>
          <span>R</span>
          <span>u</span>
          <div className={styles.line}></div>
          <span>sh</span>
        </div>

        <nav className={styles.container_nav}>
          <button
            title="аккаунт"
            className={styles.nav_button}
            onClick={() => navigateToLogin("/login")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>Горячие клавиши: Tab + Enter для быстрого рестарта</p>
      </footer>
    </div>
  );
};
