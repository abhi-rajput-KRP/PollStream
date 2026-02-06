import { useState, useEffect } from 'react'
import Footer from './components/Footer';
import NavHorizontal from './components/Header'
import { Outlet } from 'react-router';
import axios from 'axios';

function App() {
  localStorage.setItem("Backend_URI","https://pollstream-cqof.onrender.com/");
  axios.get(localStorage.getItem("Backend_URI"));
  return (
    <>
      <NavHorizontal />
      <Outlet />
      <Footer />
    </>
  )
}


export default App
