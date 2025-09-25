import express from 'express';
import sql from 'mssql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  server: 'moamcuat.dbmosl.com',
  port: 24115,
  user: 'business',
  password: 'business_2018#',
  database: 'PMS_TRACKER_NEW',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

let pool;

async function initDB() {
  try {
    pool = await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

app.post('/api/query', async (req, res) => {
  try {
    const { query } = req.body;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
});