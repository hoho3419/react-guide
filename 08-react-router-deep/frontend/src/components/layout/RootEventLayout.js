import React from 'react';
import { Outlet } from 'react-router-dom'
import EventsNavigation from '../EventsNavigation';

const RootEventLayout = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
};

export default RootEventLayout;