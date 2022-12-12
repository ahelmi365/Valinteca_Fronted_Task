export class User {
    constructor(username, email, password, password_confirmation) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }

    getuserEmail() {
        return this.email;
    }
}


