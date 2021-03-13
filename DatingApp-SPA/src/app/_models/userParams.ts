import { LoginUser } from "./loginUser";

export class UserParams {
    gender: string;
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize = 6;
    orderBy = 'lastActive';
    
    constructor(user: LoginUser) {
        this.gender = user.gender === 'male' ? 'female' : 'male'
    }
}
