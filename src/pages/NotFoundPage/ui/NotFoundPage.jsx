import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import { Home } from "lucide-react";
export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.div_404}>
        <h1>404</h1>
        <p>Пользователь не найден или такой страницы не существует</p>

        <div className={styles.container_return}>
          <Home size={20} />
          <Link to="/">Вернуться на главную</Link>
        </div>
      </div>
    </div>
  );
};
