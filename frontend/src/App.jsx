import React, { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Home from './general/Home'
import ProtectedRoute from './general/ProtectedRoute'
import Feed from './pages/deshboard/Feed'
import Profile from './pages/deshboard/Profile'
import CreatePost from './pages/deshboard/CreatePost'


const App = () => {

  
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
         <Route path='/' element={
            <Home/>}/>
          <Route path='/feed' element={<ProtectedRoute>
            <Feed/>
          </ProtectedRoute>}/>
          <Route path='/profile' element={<ProtectedRoute>
            <Profile/>
          </ProtectedRoute>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
          
      </Routes>
    </Router>
  )
}

export default App