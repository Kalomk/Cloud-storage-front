import axios from 'axios';
import { parseCookies } from 'nookies';

axios.defaults.baseURL = 'https://snakicz-bot.net/cloud/store';

if (typeof window !== 'undefined') {
  const { token } = parseCookies();

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
