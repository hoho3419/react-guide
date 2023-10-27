import React from 'react';
import { Outlet } from 'react-router-dom'
import MainNavigation from './MainNavigation';
import ModalExam from './Modal';

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <ModalExam />
      <Outlet />
    </>
  );
};

export default RootLayout;