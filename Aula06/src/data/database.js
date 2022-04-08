const { Pool, Client } = require('pg')

let connection = null;

const getConnection = async () => {
    if (connection == null) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
                }
        });

        try {
            await client.connect();
            connection = client;
            console.log('Success connecting to DB');
        } catch (error) {
            console.error({error});
        }
        
    }
    return connection;
}

module.exports = {
    getConnection
}