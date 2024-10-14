export declare enum Role {
    Manager = "manager",
    User = "user"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    role: string;
    reservations: any;
}
