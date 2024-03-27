const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = pool;