// userData.ts

// Define la interfaz UserData
export interface UserData {
    token: string;
    user: {
    _id: string;
    username: string;
    useremail: string;
    userpassword: string;
    userroles: string[];
};
}
