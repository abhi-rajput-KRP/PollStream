import { useState, useEffect } from 'react'
import Footer from './components/Footer';
import NavHorizontal from './components/Header'
import { Outlet } from 'react-router';


function App() {
  localStorage.setItem("Backend_URI","https://pollstream-cqof.onrender.com/");
  return (
    <>
      <NavHorizontal />
      <Outlet />
      <Footer />
    </>
  )
}


export default App
