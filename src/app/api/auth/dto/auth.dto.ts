export interface LoginFormDTO {
  email: string;
  password: string;
}

export type RegisterFormDTO = LoginFormDTO & { fullName: string };

export interface User {
  id: number;
  email: string;
  fullName: string;
  originalName: string;
}
