import { Link } from "react-router-dom";
import cat from "./404_not_found.jpg";
import styles from "./NotFoundPage.module.css";
export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.div_404}>
        <img src={cat}></img>
        <div className={styles.div_text}>
          <h1>404</h1>
          <p>Пользователь не найден или такой страницы не существует</p>
          <Link to="/">Вернуться на главную</Link>
        </div>
      </div>
    </div>
  );
};
