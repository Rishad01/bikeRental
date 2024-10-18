import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, LoginDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto.email, signupDto.password);
  }

  @Post("login")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
