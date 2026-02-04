import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router'
import HeroSection from './components/Hero.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import CreatePoll from './components/CreatePoll.jsx'
import AllPolls from './components/AllPolls.jsx'
import MyPolls from './components/MyPolls.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: "",
        Component: HeroSection
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "all_polls",
        Component: AllPolls
      },
      {
        path: "my_polls",
        Component: MyPolls
      },
      {
        path: "create_poll",
        Component: CreatePoll
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
