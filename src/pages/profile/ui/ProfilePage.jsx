import styles from "./ProfilePage.module.css";
import avatar from "./images.jpg";
export const ProfilePage = () => {
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
            <p className={styles.nickName}>NickName</p>
            <p className={styles.data_join}>Зарегистрирован 19 окт 2026</p>
          </div>
        </div>

        <div className={styles.line}></div>

        <div className={styles.container_test_count}>
          <div className={styles.test_count}>
            <p>Всего тестов</p>
            <p>N/A</p>
          </div>
          <div className={styles.test_count}>
            <p>Тестов закончено</p>
            <p>N/A</p>
          </div>
          <div className={styles.test_count}>
            <p>Время печати</p>
            <p>N/A</p>
          </div>
        </div>
      </div>
    </div>
  );
};
