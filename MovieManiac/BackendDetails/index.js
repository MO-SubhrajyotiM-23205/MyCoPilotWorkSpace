import sql from 'mssql';
import express from 'express';
import cors from 'cors';    
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());    

const dbConfig = {
    user: 'business',
    password: 'business_123',
    server: '10.167.202.187',
    port: 24115,
    database: 'BMS_MOHF',
    connectionTimeout: 5000,
    requestTimeout: 15000,
    options: {
        encrypt: true, // For Azure
        trustServerCertificate: true // Change to false for production
    }
};


sql
  .connect(dbConfig)
  .then((pool) => {
    app.get("/api/data", async (req, res) => {
      try {
        const result = await pool
          .request()
          .query("SELECT TOP 100 * FROM TBL_LCR_BMS_MST_DATA");
        res.json(result.recordset);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });


  app.get('/api/SPdata', async (req, res) => {
    try {
    await sql.connect(dbConfig);
    console.log('DB connected');
    // Call stored procedure using new sql.Request()
    const request = new sql.Request();
    // request.input('paramName', sql.VarChar, value); // Uncomment and edit if your procedure needs parameters
    const result = await request.execute('TestProcedure'); // Replace with your procedure name
    console.log('Procedure executed, rows:', result?.recordset?.length ?? 0);
    res.json(result.recordset);
    } catch (err) {
        console.error('DB error:', err);
        res.status(500).json({ error: err.message });
    }
});

