import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FetchTasks from './pages/FetchTasks'
import ListTaskById from './pages/ListTaskById'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/'>
          <Route index element={<Home />} />
        </Route>

        <Route path='/tasks'>
          <Route index element={<FetchTasks />} />
          <Route path=':id' element={<ListTaskById />} />
          <Route path=':id/create' element={null} />
          <Route path=':id/edit' element={null} />
          <Route path=':id/complete' element={null} />
          <Route path=':id/delete' element={null} />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode >
)
