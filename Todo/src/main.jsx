import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home.jsx'
import SignIn from './components/SignIn.jsx'
import Login from './components/Login.jsx'
import Todo from './components/Todo.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home />}/>
      <Route path='signin' element={<SignIn />}/>
      <Route path='login' element={<Login />}/>
      <Route path='todo' element={<ProtectedRoute>
            <Todo />
          </ProtectedRoute>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
     <RouterProvider router = {router}/>
     </AuthProvider>
  </StrictMode>,
)
