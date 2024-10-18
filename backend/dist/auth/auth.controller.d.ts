import { AuthService } from "./auth.service";
import { SignupDto, LoginDto } from "./dto/auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
}
