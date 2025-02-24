import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'

import NavBar from './components/NavBar.tsx';
import Home from './pages/HomePage.tsx';
import Login from './pages/LoginPage.tsx';
import Task from './pages/TaskPage.tsx';

import { AuthProvider } from './context/AuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavBar/>}>
          <Route index element={<Home/>}/>
          <Route element={<ProtectedRoute/>}>
          <Route path="/tasks" element={<Task/>}/>
        </Route>
        </Route>
        <Route path='/login' element={<Login/>}/>


      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
