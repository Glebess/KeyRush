import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка регистрации");
      }
      navigate("/login");
    } catch (err) {
      setError(err.message || "Ошибка регистрации");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.login_form} onSubmit={handleRegister}>
        <h3>Регистрация аккаунта</h3>

        {error && <div className={styles.error}>{error}</div>}

        <input
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Зарегистрироваться</button>
        <p>
          Уже есть аккаунт? <Link to={"/login"}>Войти</Link>
        </p>
      </form>
    </div>
  );
};
