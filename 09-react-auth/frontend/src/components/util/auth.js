import { redirect } from 'react-router-dom'

export const getTokenDuration = () =>{
  const storedExpiration = localStorage.getItem('expiration');
  const expiration = new Date(storedExpiration);
  const now = new Date();
  const duration = expiration.getTime() - now.getTime();
  return duration;
}

export const getItemToken = () =>{
  const token = localStorage.getItem('token');

  if(!token){
    return null;
  }

  const duration = getTokenDuration();
  if(duration < 0){
    return 'EXPIRED';
  }
  return token;
}

export const loadToken = () =>{
 const token = getItemToken();
  return token;
}

export function checkAuthLoader() {
  const token = getItemToken();
  
  // 토큰이 없으면 로그인페이지로 이동
  if (!token) {
    return redirect('/auth');
  }
 
  return null;
}