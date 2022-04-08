const { getConnection } = require("../data/database");

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = 'default';
        //encrypt pass...
        this.password = password;
    }
}

class UserDAO {
    static async insert(user) {
        const con = await getConnection();
        
        const sql = `INSERT INTO public.users ("name",email,"password")
	    VALUES ($1, $2, $3);`
        
        const values = [user.name, user.email, user.password];

        await con.query(sql, values)
        
    }
}

module.exports = { User, UserDAO };