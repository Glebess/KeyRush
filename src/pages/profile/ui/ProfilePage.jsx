import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import avatar from "./images.jpg";

export const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    createdAt: null,
    totalTests: 0,
    completedTests: 0,
    typingTime: 0,
  });

  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let targetUserName = username;

    // Если в URL нет ID, берем из localStorage (для своего профиля)
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

    // Запрос к бэкенду по username пользователя
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

  const dataJoin = profileData.createdAt
    ? new Date(profileData.createdAt).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "неизвестно";

  return (
    <div className={styles.container}>
      <div className={styles.container_info}>
        <div className={styles.container_mainInfo}>
          <div className={styles.container_avatar}>
            <div className={styles.avatar}>
              <img src={avatar} alt="avatar" />
            </div>
          </div>
          <div className={styles.container_nickName}>
            <p className={styles.nickName}>{profileData.username}</p>
            <p className={styles.data_join}>{`Зарегистрирован ${dataJoin}`}</p>
          </div>
        </div>

        <div className={styles.line}></div>

        <div className={styles.container_test_count}>
          <div className={styles.test_count}>
            <p>Всего тестов</p>
            <p>{profileData.totalTests}</p>
          </div>
          <div className={styles.test_count}>
            <p>Тестов закончено</p>
            <p>{profileData.completedTests}</p>
          </div>
          <div className={styles.test_count}>
            <p>Время печати</p>
            <p>{profileData.typingTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
