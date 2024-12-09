import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;