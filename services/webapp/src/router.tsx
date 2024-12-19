import { createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import ListTaskById from './pages/ListTaskById'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/tasks/:slug',
    element: <ListTaskById />
  },
])
