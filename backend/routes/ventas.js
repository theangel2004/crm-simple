// Importamos express y la conexión a la BD
import express from 'express';
import { db } from '../db.js';

const router = express.Router();

/* ------------------------------------------
   POST /api/ventas → Registrar una venta
--------------------------------------------- */
router.post('/', (req, res) => {
  const { cliente, producto, total } = req.body;

  // Primero buscamos el ID del cliente por su nombre
  const queryCliente = 'SELECT id FROM clientes WHERE nombre = ?';

  db.query(queryCliente, [cliente], (err, result) => {
    if (err) {
      console.error('Error al buscar cliente:', err);
      return res.status(500).json({ error: 'Error al buscar cliente' });
    }

    // Si el cliente no existe, devolvemos error
    if (result.length === 0) {
      return res.status(400).json({ error: 'Cliente no encontrado' });
    }

    const clienteId = result[0].id;

    // Ahora insertamos la venta usando el id del cliente
    const queryVenta =
      'INSERT INTO ventas (cliente_id, producto, total) VALUES (?, ?, ?)';

    db.query(queryVenta, [clienteId, producto, total], (err2) => {
      if (err2) {
        console.error('Error al registrar venta:', err2);
        return res.status(500).json({ error: 'Error al registrar venta' });
      }

      res.json({ mensaje: 'Venta registrada correctamente' });
    });
  });
});

/* ------------------------------------------
   GET /api/ventas → Listar todas las ventas
--------------------------------------------- */
router.get('/', (req, res) => {
  const query = `
    SELECT v.id, c.nombre AS cliente, v.producto, v.total, v.fecha
    FROM ventas v
    JOIN clientes c ON v.cliente_id = c.id
    ORDER BY v.fecha DESC
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al listar ventas:', err);
      return res.status(500).json({ error: 'Error al listar ventas' });
    }

    res.json(result);
  });
});

export default router;