import axios from 'axios';
import { parseCookies } from 'nookies';

axios.defaults.baseURL = 'http://localhost:7777';

if (typeof window !== 'undefined') {
  const { token } = parseCookies();

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
