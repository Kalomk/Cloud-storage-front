import { destroyCookie } from 'nookies';
import axios from '../../../core/axios';
import { LoginFormDTO, RegisterFormDTO, User } from './dto/auth.dto';

export const login = async (values: LoginFormDTO): Promise<string> =>
  (await axios.post('auth/login', values)).data;

export const register = async (values: RegisterFormDTO): Promise<string> =>
  (await axios.post('auth/signup', values)).data;

export const getMe = async (): Promise<User> => (await axios.get('/users/me')).data;

export const logout = () => destroyCookie(null, 'token', { path: '/' });
