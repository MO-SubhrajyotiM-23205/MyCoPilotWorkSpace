#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import sql from 'mssql';
import express from 'express';
import cors from 'cors';

const server = new Server(
  {
    name: 'sqlserver-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// SQL Server configuration
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

// Initialize database connection
async function initDB() {
  try {
    pool = await sql.connect(config);
    console.error('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

// Tool to execute SQL queries
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'execute_query') {
    try {
      const result = await pool.request().query(args.query);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result.recordset, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${name}`);
});

// List available tools
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'execute_query',
        description: 'Execute SQL query on PMS_TRACKER_NEW database',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'SQL query to execute',
            },
          },
          required: ['query'],
        },
      },
    ],
  };
});

async function main() {
  await initDB();
  
  // Start Express server
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  app.post('/api/query', async (req, res) => {
    try {
      const { query } = req.body;
      const result = await pool.request().query(query);
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.listen(3001, () => {
    console.log('HTTP server running on http://localhost:3001');
  });
  
  // Start MCP server
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);