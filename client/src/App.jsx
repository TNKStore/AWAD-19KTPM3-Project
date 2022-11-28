import React, { useEffect } from "react";
import FormWithoutHookForm from "./pages/login";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, redirect, Route, RouterProvider, Routes, BrowserRouter as Router } from "react-router-dom";
import Root from "./pages/root";
import ErrorPage from "./error-page";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ImagePage from "./pages/images";
import PrivateRoute from './privateRoute/privateRoute';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from "./features/user/userSlice";
import GroupsPage from './pages/groups';
import GroupDetailPage from './pages/groupDetail';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUserFromLocalStorage())
  }, [])

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute role={['admin', 'user']} />} >
        {/* chỉ những người có role tương ứng mới vào được */}
          <Route path='/' element={<Root/>} exact/>
          <Route path='/groups/:id' element={<GroupDetailPage/>} />
          <Route path='/groups' element={<GroupsPage/>} />
       
        </Route>
        
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
      </Routes>
    </Router>
 
  );
}

export default App;
