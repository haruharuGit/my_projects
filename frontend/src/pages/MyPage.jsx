import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import MainLayout from "../layouts/MainLayout";
import { useAuthUserId } from "../api/auth";
import PostFeed from '../components/PostFeed'
import axios from 'axios';

const MyPage = () => {
  const { userId, isLoading, error } = useAuthUserId();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${userId}`);
          setUser(response.data.profile);
          setPosts(response.data.posts);
        } catch (error) {
          console.error("ユーザー情報の取得に失敗しました:", error.message);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <MainLayout userId={userId}>
      {user && (
        <VStack spacing={8} align="center" maxW="container.md" mx="auto" p={4}>
          <Heading as="h1" size="lg" textAlign="center" mt={8}>
            {`${user.nickname}さんのマイページ`}
          </Heading>
          <Flex align="center" gap={4} mt={8}>
            <Avatar size="xl" name={user.nickname} src={user.avatar_url} />
          </Flex>
          <Flex align="center" gap={4}>
            <Box>
              <PostFeed posts={posts} />
            </Box>
          </Flex>
        </VStack>
      )}
    </MainLayout>
  );
};

export default MyPage;

