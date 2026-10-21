import styles from "./LoginPage.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка входа");
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError("Ошибка входа.Проверте данные");
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.login_form} onSubmit={handleLogin}>
        <h3>Вход в аккаунт</h3>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={username}
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
        <button type="submit">Войти</button>
        <p>
          Нет аккаунта? <Link to={"/register"}>Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
};
