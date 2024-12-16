import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NewProfile from './pages/CreateProfile';
import Home from './pages/Home'
import MyPage from './pages/MyPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/index" element={<Posts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile/create" element={<NewProfile />} />
        <Route path="/profile" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;