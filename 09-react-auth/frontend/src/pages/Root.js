import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../components/util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() =>{
    if(!token){
      return;
    }
    if(token === 'EXPIRED'){
      submit(null,{method: 'post',action:'/logout'});
      return;
    }
    const duration = getTokenDuration();
    console.log(duration)
    
    const timeoutId = setTimeout(() =>{
      submit(null,{method: 'post',action:'/logout'});
    },duration)

    return () =>{
      clearTimeout(timeoutId);
    }
  },[token,submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
