//packages
import { Routes, Route } from 'react-router-dom'

//local imports
import Home from '../pages/Home.jsx'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Todos from "../pages/Todos.jsx"
import PrivateRoute from "./PrivateRoute.jsx"


function PagesRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/todos" exact element={<PrivateRoute><Todos /></PrivateRoute>}/>
      </Routes>
    </>
  )
}

export default PagesRoutes
