const { Pool, Client } = require('pg')

let connection = null;

const getConnection = async () => {
    if (connection == null) {
        const client = new Client({
            connectionString: 'postgres://xekauhxcynltjx:bb400288324479148012cb940fac53bdfeac7c4b989487cb96f6da8928215c06@ec2-3-228-222-169.compute-1.amazonaws.com:5432/d2i84tvst90v12',
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