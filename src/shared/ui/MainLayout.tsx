import React from "react";
import styles from "./MainLayout.module.css";
// import { infoIcon } from "../assets/svg/TrainerPageSvg";
interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
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

        {/* <div className={styles.container_nav}>
          <nav className={styles.nav}>{infoIcon}</nav>
        </div> */}
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>Горячие клавиши: Tab + Enter для быстрого рестарта</p>
      </footer>
    </div>
  );
};
