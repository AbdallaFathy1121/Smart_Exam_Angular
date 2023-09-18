export class User {
    constructor(
        public userId: string,
        public name: string,
        public email: string,
        public roles: string[],
        public token: string,
        public tokenExpiration: string 
    ) {}
}