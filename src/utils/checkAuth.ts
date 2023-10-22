import { cookies } from 'next/headers';
import axios from '../core/axios';
import { Auth } from '@/app/api/auth';
import { redirect } from 'next/navigation';

export const checkAuth = async () => {
  const nextCookies = cookies();
  const _token = nextCookies.get('token'); // Find cookie

  // Check if token is missing
  if (!_token) redirect('/authorization');
  try {
    // Set authorization header for Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${_token.value}`;
    // Call API to check authentication
    await Auth.getMe();

    console.log('Successful auth check');
  } catch (error) {
    console.log('Check failed: ' + error);
    redirect('/authorization');
  }
};
