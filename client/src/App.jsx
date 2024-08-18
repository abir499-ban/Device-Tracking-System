import React from 'react'
import Map from './components/Map'
import Button from '@mui/material/Button';
import SignUp from './components/SignUp';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/map' element={<Map/>} />
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
