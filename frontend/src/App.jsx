import { useState } from 'react'
import io from "socket.io-client";
import Footer from './components/Footer';
import NavHorizontal from './components/Header'
import { UserConetxtProvider } from './context/UserContext';
import { Outlet } from 'react-router';

// const socket = io("http://localhost:5000");

function App() {
  const [Username, setUsername] = useState("")
  const [Token, setToken] = useState("")

  if (Token) {
    return (
      <>
        <Outlet />
        <Footer />
      </>
    )
  }
  else {
    return (
      <UserConetxtProvider value={{ Username, Token }}>
        <NavHorizontal />
        <Outlet/>
        <Footer />
      </UserConetxtProvider>
    )
  }

}

export default App
