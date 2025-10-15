import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nombre, telefono, correo } = req.body;
  db.query('INSERT INTO clientes (nombre, telefono, correo) VALUES (?, ?, ?)', 
    [nombre, telefono, correo], 
    (err) => {
      if (err) throw err;
      res.json({ mensaje: 'Cliente agregado correctamente' });
    });
});

export default router;
