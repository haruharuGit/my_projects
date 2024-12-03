import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  );
}

export default App;