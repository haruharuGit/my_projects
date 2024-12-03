import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Box, VStack, Spinner, Text, Button } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import MainLayout from '../layouts/MainLayout'
import PostFeed from '../components/PostFeed'


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api/v1/posts');
        setPosts(response.data)
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching posts:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <MainLayout>
      <Box position='relative' pb={20}>
        <VStack spacing={4} align='stretch' w='100%' maxW='600px' mx='auto' p={4}>
          {isLoading ? (
            <Spinner size='xl' alignSelf='center' />
          ) : error ? (
            <Text color='red.500' textAlign='center'>{error}</Text>
          ) : posts.length > 0 ? (
            <PostFeed posts={posts} />
          ) : (
            <Text textAlign='center'>投稿はありません。</Text>
          )}
        </VStack>
      </Box>

      <Button 
      colorScheme='yellow' 
      position='fixed' 
      bottom={16} 
      right={16}
      zIndex={10}
    >
      Button
    </Button>
    </MainLayout>
  )
}

export default Posts

/*
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
    <Box minH="100vh" bg="gray.50">
      <Header />
      <div>
        <h1>投稿一覧</h1>
        {/* 投稿が存在する場合に一覧を表示
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="post">
              <p>{post.content}</p>
              {post.image_url && <img src={post.image_url} alt="投稿が表示できません" />} {/* 画像があれば表示
            </div>
          ))
        ) : (
          <p>投稿はありません。</p>
        )}
      </div>
    </Box>
  );
};

export default Posts; */