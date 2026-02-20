import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataToGenerateJWT } from '../../types/AuthInterfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '030503Vane150402Alan',
    });
  }
  validate(payload: DataToGenerateJWT): unknown {
    return {
      id_user: payload.id_user,
      email: payload.email,
      rols: payload.rols,
      id_program: payload.id_program,
    };
  }
}
