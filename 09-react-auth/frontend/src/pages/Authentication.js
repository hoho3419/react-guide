import AuthForm from '../components/AuthForm';
import { json,redirect } from 'react-router-dom'

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({request}) =>{
  const searchParam = new URL(request.url).searchParams
  const data = await request.formData();
  const mode = searchParam.get('mode') || 'login';

  if(mode !== 'login' && mode !== 'signup'){
    throw json({message: '로그인 또는 회원가입 요청이 아닙니다.'},{status: 500});
  }
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }
  const response =  await fetch('http://localhost:8080/' + mode,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData)
  })
  if(response.status === 422 || response.status === 401){
    return response;
  }
  if(!response.ok){
    throw json({message: '잘못된 요청입니다'},{ status: 500 });
  }
  const responseData = await response.json();
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration',expiration.toISOString());
  localStorage.setItem('token',responseData.token);

  return redirect('/');
}