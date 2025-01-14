import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Avatar,
  Flex,
  Text,
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
          console.log(response.data.profile);
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

  const ageCalculation = (kidBirthday) => {
    const birthday = new Date(kidBirthday);
    const today = new Date();

    let years = today.getFullYear() - birthday.getFullYear();
    let months = today.getMonth() - birthday.getMonth();

    // 月がマイナス(今年の誕生日が来ていない)の場合
    if (months < 0) {
      years -= 1;
      months += 12
    }

    // 月が0、今日の日が誕生日の日より前の場合(誕生月だが誕生日が来ていない)の場合
    if (months === 0 && today.getDate() < birthday.getDate()) {
      years -= 1;
      months = 11;
    }

    return `子どもは${years}歳${months}ヶ月です`;
  };

  

  return (
    <MainLayout userId={userId}>
      {user && (
        <VStack spacing={8} align="center" maxW="container.md" mx="auto" p={4}>
          <Heading as="h1" size="lg" textAlign="center" mt={8}>
            {`${user.nickname}さんのマイページ`}
          </Heading>
          <Flex align="center" gap={4} mt={8}>
            <Avatar size="xl" name={user.nickname} src={user.avatar_url} />
            <Text fontSize="lg" color="gray.700">
              {ageCalculation(user.kid_birthday)}
            </Text>
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

