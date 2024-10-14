import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(email: string, password: string): Promise<any>;
    login(email: string, password: string): Promise<any>;
}
