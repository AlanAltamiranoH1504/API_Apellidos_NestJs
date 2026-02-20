import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user_to_get_token = await this.authService.validate_user_admin(
      loginDto.email,
      loginDto.password,
    );
    if (!user_to_get_token) {
      throw new UnauthorizedException('Credenciales incorrectaas');
    }
    const rols = user_to_get_token.rols.map((rol) => {
      return rol.id_rol;
    });
    return this.authService.generate_jwt({
      id_user: user_to_get_token.id_user,
      email: user_to_get_token.email,
      rols: rols,
      id_program: user_to_get_token.id_program,
    });
  }
}
