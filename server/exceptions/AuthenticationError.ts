export class AuthenticationError extends Error {
    constructor() {
        super();
        this.name = "Authentication Error";
        this.message = "Invalid Email / Password. Please try again";
    }
};