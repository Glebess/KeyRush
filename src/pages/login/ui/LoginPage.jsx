import styles from "./LoginPage.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const validationForm = () => {
  //   if(userName )
  // }

  return (
    <div className={styles.container}>
      <form className={styles.login_form}>
        <h3>Вход в аккаунт</h3>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder="имя пользователя"
          type="text"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="пароль"
          type="password"
          required
        />
        <button type="submit" disabled>
          Войти
        </button>
        <p>
          Нет аккаунта? <Link to={"/register"}>Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
};
