
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;

        //encrypt pass...
        this.password = password;
    }
}

module.exports = User;