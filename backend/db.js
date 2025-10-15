import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'crm_perfumeria'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a MySQL');
});
