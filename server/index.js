const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Инициализация базы данных SQLite
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Ошибка подключения к SQLite:", err.message);
  } else {
    console.log("Подключено к базе данных SQLite.");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )
`);

// таблица для сохранения результатов тестов
db.run(`
  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    wpm INTEGER,
    accuracy REAL,
    date TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Заполните все поля" });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const query = `INSERT INTO users (username, password_hash) VALUES (?, ?)`;
    db.run(query, [username, passwordHash], function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res
            .status(400)
            .json({ error: "Пользователь с таким именем уже существует" });
        }
        return res
          .status(500)
          .json({ error: "Ошибка сервера при регистрации" });
      }
      res
        .status(201)
        .json({ message: "Успешная регистрация", userId: this.lastID });
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка хэширования пароля" });
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Заполните все поля" });
  }

  const query = `SELECT * FROM users WHERE username = ?`;
  db.get(query, [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Ошибка сервера" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ error: "Неверное имя пользователя или пароль" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res
        .status(400)
        .json({ error: "Неверное имя пользователя или пароль" });
    }

    res.json({
      message: "Успешный вход",
      user: { id: user.id, username: user.username },
    });
  });
});

app.get("/api/user/:id", (req, res) => {
  const userId = req.params.id;
  db.get(
    `SELECT id, username FROM users WHERE id = ?`,
    [userId],
    (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }
      db.get(
        `SELECT COUNT(*) as totalTests, SUM(wpm) as totalWpm FROM results WHERE user_id = ?`,
        [userId],
        (err, stats) => {
          if (err) {
            stats = { totalTests: 0, totalWpm: 0 };
          }

          res.json({
            username: user.username,
            totalTests: stats.totalTests || 0,
            completedTests: stats.totalTests || 0, // или своя логика
            typingTime: Math.round((stats.totalWpm || 0) / 2), // пример расчета времени
          });
        },
      );
    },
  );
});
app.post("/api/results", (req, res) => {
  const { userId, wpm, accuracy } = req.body;

  if (!userId || wpm === undefined || accuracy === undefined) {
    return res
      .status(400)
      .json({ error: "Недостаточно данных для сохранения результата" });
  }

  const date = new Date().toISOString();
  const query = `INSERT INTO results (user_id, wpm, accuracy, date) VALUES (?, ?, ?, ?)`;

  db.run(query, [userId, wpm, accuracy, date], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка сохранения результата в базу данных" });
    }
    res
      .status(201)
      .json({ message: "Результат сохранен", resultId: this.lastID });
  });
});
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
