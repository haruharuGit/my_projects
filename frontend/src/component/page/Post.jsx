import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]); // postsの状態を管理

  useEffect(() => {
    // APIからデータを取得
    fetch('http://localhost:3010/api/v1/posts') // APIのエンドポイントURL
      .then(response => response.json()) // レスポンスをJSONに変換
      .then(data => setPosts(data)) // 取得したデータをstateにセット
      .catch(error => console.error('Error fetching posts:', error));
  }, []); // コンポーネントが初めてレンダリングされたときにのみ実行

  return (
    <div>
      <h1>Posts List</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.content}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
