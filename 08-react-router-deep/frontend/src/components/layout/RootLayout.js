import React from 'react';
import { Outlet } from 'react-router-dom'; //,useNavigation
import MainNavigation from '../MainNavigation';

const RootLayout = () => {
  // 로딩 스피너 구현하는법
  // const navigation = useNavigation();

  return (
    <>
     <MainNavigation />
     {/* {navigation.state === 'loading' && <p>로딩중입니다.</p>} */}
     <Outlet /> 
    </>
  );
};

export default RootLayout;