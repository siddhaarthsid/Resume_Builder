const { Pool } = require('pg');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('\x1b[33m%s\x1b[0m', 'WARNING: DATABASE_URL is not set in backend/.env. Please configure your Neon database connection string!');
}

const pool = new Pool({
  connectionString: databaseUrl,
  // For Neon connection, it might require SSL. We enable it by default if connection string includes neon.tech
  ssl: databaseUrl && databaseUrl.includes('neon.tech') ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('Successfully connected to the database.');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err);
});

module.exports = {
  query: (text, params) => {
    if (!databaseUrl) {
      throw new Error('Database connection string is missing. Please set DATABASE_URL in backend/.env');
    }
    return pool.query(text, params);
  },
  pool
};
