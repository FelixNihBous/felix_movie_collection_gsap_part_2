import { useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import MovieDetail from './components/MovieDetail'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/movie/:ttid' element={<MovieDetail />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
