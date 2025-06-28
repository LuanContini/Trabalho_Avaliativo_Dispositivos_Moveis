import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Client } from 'pg';
import pool from './config/db.js';

// Conexão com o banco de dados PostgreSQL


const app = express();
app.use(cors());
app.use(express.json());

// ===================== GASTOS =====================
// GET: Buscar todos os gastos
app.get('/gastos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM gestor.gastos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Criar um novo gasto
app.post('/gastos', async (req, res) => {
  const { valor, descricao, categoria } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO gestor.gastos (valor, descricao, categoria) VALUES ($1, $2, $3) RETURNING *',
      [valor, descricao, categoria]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inicializa o servidor
app.listen(3000, () => console.log('API rodando na porta 3000'));