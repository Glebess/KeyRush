import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { LogOut } from "lucide-react";
export const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let targetUserName = username;

    if (!targetUserName) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          targetUserName = user.username;
        } catch (e) {
          console.error("Ошибка парсинга пользователя", e);
        }
      }
    }

    if (!targetUserName) {
      navigate("/404");
      return;
    }

    fetch(`http://localhost:5000/api/user/${targetUserName}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setProfileData(data);
        } else {
          navigate("/404");
        }
      })
      .catch((err) => {
        console.log("Ошибка загрузки профиля:", err);
        navigate("/404");
      });
  }, [username, navigate]);

  const dataJoin = profileData?.createdAt
    ? new Date(profileData.createdAt).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "неизвестно";

  const initial = (profileData?.username || "?").trim().charAt(0).toUpperCase();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <section className={styles.page}>
      <article className={styles.card}>
        {!profileData ? (
          <p className={styles.loading}>Загрузка профиля...</p>
        ) : (
          <>
            <header className={styles.identity}>
              <div className={styles.avatar} aria-hidden="true">
                {initial}
              </div>
              <div className={styles.identityText}>
                <p className={styles.eyebrow}>Профиль</p>
                <h1>{profileData.username}</h1>
                <p className={styles.joined}>На сайте с {dataJoin}</p>
              </div>
              <button
                className={styles.logOut}
                title="Выйти с аккаунта"
                onClick={() => handleLogOut()}
              >
                <LogOut size={26} />
              </button>
            </header>

            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt>Всего тестов</dt>
                <dd>{profileData.totalTests}</dd>
              </div>
              <div className={styles.stat}>
                <dt>Пройдено</dt>
                <dd>{profileData.completedTests}</dd>
              </div>
              <div className={styles.stat}>
                <dt>Время печати</dt>
                <dd>{profileData.typingTime}</dd>
              </div>
            </dl>
          </>
        )}
      </article>
    </section>
  );
};
