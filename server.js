import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
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

app.get("/protected", authenticateToken, (req, res) => {
    res.send({ message: `Hello, user ${req.user.id}!` });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
