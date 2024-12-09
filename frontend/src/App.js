import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import CreateProfile from './pages/CreateProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Posts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile/create" element={<CreateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;