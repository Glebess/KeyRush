import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Успешная регистрация");
      navigate("/");
    } catch (err) {
      setError("Ошибка входа.Проверте данные");
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.login_form} onSubmit={handleRegister}>
        <h3>Регистрация аккаунта</h3>
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
        <button type="submit">Зарегистрироваться</button>
        <p>
          Уже есть аккаунт? <Link to={"/login"}>Войти</Link>
        </p>
      </form>
    </div>
  );
};
