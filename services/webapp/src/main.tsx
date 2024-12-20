import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Tasks from './pages/Tasks/Home'
import EditTask from './pages/Tasks/Edit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/'>
          <Route index element={<Home />} />
        </Route>

        <Route path='/tasks'>
          <Route index element={<Tasks />} />
          <Route path=':id/edit' element={<EditTask />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode >
)
