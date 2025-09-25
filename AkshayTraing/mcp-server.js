#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import sql from 'mssql';

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
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);