import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Box, VStack, Spinner, Text, Button } from '@chakra-ui/react'
import MainLayout from '../layouts/MainLayout'
import PostFeed from '../components/PostFeed'


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        console.log("API Response Data:", response.data);
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

  const handleCreatePostClick = () => {
    navigate('/create');
  };

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
        onClick={handleCreatePostClick}
      >
        投稿する
      </Button>
    </MainLayout>
  )
}

export default Posts