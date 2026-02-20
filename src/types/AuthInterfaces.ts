import 'express';

export interface UserAdminLogin {
  email: string;
  password: string;
}

export interface DataToGenerateJWT {
  id_user: number;
  email: string;
  id_program: number;
  rols: number[];
}
