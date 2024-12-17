import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
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
          console.error("ユーザー情報の取得に失敗しました:", error);
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
    <MainLayout>
      <VStack spacing={8} align="stretch" maxW="container.md" mx="auto" p={4}>
        <Heading as="h1" size="lg" textAlign="center" mt={8}>
          マイページ
        </Heading>

        {user && (
          <Flex align="center" gap={4}>
            {/* <Avatar size="lg" name={user.name} src={user.avatar} bg="blue.500" /> */}
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                {user.nickname}
              </Text>
              <PostFeed posts={posts} />
            </Box>
          </Flex>
        )}
      </VStack>
    </MainLayout>
  );
};

export default MyPage;

