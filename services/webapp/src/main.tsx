import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Tasks from './pages/Tasks/Home'
import EditTask from './pages/Tasks/Edit'
import Health from './pages/health-check'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/'>
          <Route index element={<Home />} />
        </Route>

        <Route path='/tasks'>
          <Route index element={<Tasks />} />
          <Route path=':id' element={<EditTask />} />
        </Route>

        <Route path='/health'>
          <Route index element={<Health />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode >
)
