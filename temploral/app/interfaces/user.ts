export interface User {
    _id: string;
    token: string;
    username: string;
    useremail: string;
    userpassword?: string;
    userroles?: string[];
}