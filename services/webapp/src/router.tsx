import { createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home'
import ListTaskById from './routes/ListTaskById'

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
