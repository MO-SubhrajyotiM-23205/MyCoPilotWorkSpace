#!/usr/bin/env node

import 'dotenv/config';
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
  server: process.env.DB_SERVER || 'moamcuat.dbmosl.com',
  port: process.env.DB_PORT || 24115,
  user: process.env.DB_USER || 'business',
  password: process.env.DB_PASSWORD || '<password>',
  database: process.env.DB_NAME || 'PMS_TRACKER_NEW',
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
      const query = args.query.trim();
      const queryLower = query.toLowerCase();
      
      // Only allow SELECT statements
      if (!queryLower.startsWith('select')) {
        throw new Error('Only SELECT queries are allowed');
      }
      
      // Block dangerous keywords and patterns
      const dangerousPatterns = [
        /union\s+select/i,
        /drop\s+table/i,
        /delete\s+from/i,
        /insert\s+into/i,
        /update\s+set/i,
        /exec\s*\(/i,
        /execute\s*\(/i,
        /--/,
        /;\s*select/i,
        /xp_/i,
        /sp_/i
      ];
      
      if (dangerousPatterns.some(pattern => pattern.test(query))) {
        throw new Error('Query contains prohibited patterns');
      }
      
      // Whitelist allowed tables only
      const allowedTables = ['TBL_COC_DIST_MASTER', 'TBL_COC_DIST_STATUS'];
      const hasAllowedTable = allowedTables.some(table => 
        queryLower.includes(table.toLowerCase())
      );
      
      if (!hasAllowedTable) {
        throw new Error('Query must reference allowed tables only');
      }
      
      const result = await pool.request().query(query);
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