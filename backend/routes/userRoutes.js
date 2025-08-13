import { Router } from "express";
import { pool } from "../db/connection.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Endpoint para agregar usuario
router.post("/", async (req, res) => {
  try {
    const { name, email, role, status, avatar } = req.body;
    const [result] = await pool.query(
      "INSERT INTO usuarios (name, email, role, status, avatar) VALUES (?, ?, ?, ?, ?)",
      [name, email, role, status, avatar]
    );
    res.status(201).json({ id: result.insertId, name, email, role, status, avatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar usuario" });
  }
});

// Endpoint para login 
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length > 0) {
      res.json(rows[0]); // usuario válido
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});
export default router;