
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

module.exports = User;