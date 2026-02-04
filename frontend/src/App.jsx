import { useState, useEffect } from 'react'
import io from "socket.io-client";
import Footer from './components/Footer';
import NavHorizontal from './components/Header'
import { Outlet } from 'react-router';

// const socket = io("http://localhost:5000");

function App() {
  useEffect(()=>{
    const curr_date = Date.now();
    if (curr_date-Number(localStorage.getItem('creation_time')) >= (1.5*24*60*60*100)){
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    }
  },[])

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
