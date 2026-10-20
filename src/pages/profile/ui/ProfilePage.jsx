import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import avatar from "./images.jpg";
export const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    username: "Загрузка...",
    totalTests: 0,
    completedTests: 0,
    typingTime: 0,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return;

    const user = JSON.parse(savedUser);

    fetch(`http://localhost:5000/api/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setProfileData(data);
        }
      })
      .catch((err) => console.log("Ошибка загрузки профиля:", err));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.container_info}>
        <div className={styles.container_mainInfo}>
          <div className={styles.container_avatar}>
            <div className={styles.avatar}>
              <img src={avatar}></img>
            </div>
          </div>
          <div className={styles.container_nickName}>
            <p className={styles.nickName}>{profileData.username}</p>
            <p className={styles.data_join}>KeyRush</p>
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
