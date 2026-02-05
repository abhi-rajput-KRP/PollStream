import { useState, useEffect } from 'react'
import io from "socket.io-client";
import Footer from './components/Footer';
import NavHorizontal from './components/Header'
import { Outlet } from 'react-router';

// const socket = io("https://pollstream-cqof.onrender.com");

function App() {
  const access_token = localStorage.getItem('access_token')
  if (!access_token) {
    return (
      <>
        <Outlet />
        <Footer />
      </>
    )
  }
  else {
    return (
      <>
        <NavHorizontal />
        <Outlet />
        <Footer />
      </>
    )
  }

}

export default App
