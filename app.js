const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

const app = express();
app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
    res.sendFile("dist/index.html");
});

app.post("/register", async (req, res) => {
    const { login, email, password } = req.body;
    try {
        let result = await pool.query(
            "SELECT * FROM Users WHERE login = ? OR email = ?",
            [login, email]
        );

        if (result[0].length > 0) {
            return res.status(400).send({
                error: "User with this login or email already exists.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await pool.query(
            "INSERT INTO Users (login, email, password) VALUES (?, ?, ?)",
            [login, email, hashedPassword]
        );
        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ error: "Error registering user." });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query(
            "SELECT * FROM Users WHERE email = ?",
            [email]
        );
        if (users.length === 0) {
            return res
                .status(401)
                .send({ error: "Invalid email or password." });
        }
        const user = users[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res
                .status(401)
                .send({ error: "Invalid email or password." });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error: "Error logging in." });
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send({ error: "Access denied." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ error: "Invalid token." });
        }
        req.user = user;
        next();
    });
};

app.post("/add", authenticateToken, async (req, res) => {
    const data = req.body;
    data.user_id = req.user.id;
    await pool.query("INSERT INTO Events SET ?", data);
    let result = await pool.query("SELECT * FROM Events WHERE user_id = ?", [req.user.id]);
    res.send(result[0]);
});

app.post("/events", authenticateToken, async (req, res) => {
    let result = await pool.query("SELECT * FROM Events WHERE user_id = ?", [req.user.id]);
    if (result[0].length === 0) {
        return res.status(404).send({ error: "No events found." });
    }
    res.send(result[0]);
});

app.delete("/remove/:id", authenticateToken, async (req, res) => {
    await pool.query("DELETE FROM events WHERE id = ?", [req.params.id]);
    let result = await pool.query("SELECT * FROM Events WHERE user_id = ?", [req.user.id]);
    res.send(result[0]);
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
