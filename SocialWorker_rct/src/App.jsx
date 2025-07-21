import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import SocialWorkerHome from './SocialWorkerHome';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SocialWorkerHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
