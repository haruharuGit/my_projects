import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuthUserId } from "../api/auth";


export default function NewProfile() {
  const [nickname, setNickname] = useState('');
  const [kidBirthday, setKidBirthday] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userId, isLoading: authLoading, error } = useAuthUserId();
  const navigate = useNavigate();

  if (authLoading) {
    return <p>認証中...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const fetchCreateProfile = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!nickname || !kidBirthday) {
        alert('すべてのフォームを入力して下さい。')
        return;
      }

      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/profiles`, {
        profile: {
          nickname: nickname,
          kid_birthday: kidBirthday,
          user_id: userId,
        },},
        {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'client': localStorage.getItem('client'),
            'uid': localStorage.getItem('uid'),
        }
      });

      if (!res.status || (res.status < 200 || res.status >= 300)) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      alert('プロフィールを登録しました。');
      navigate('/index');
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('プロフィールの登録に失敗しました。');
    } finally {
      setIsLoading(false);
      setNickname('');
      setKidBirthday('');
    }
  }

  return (
    <MainLayout>
      <Box
        maxW="400px"
        mx="auto"
        mt="50px"
        p="20px"
        bg="orange.50"
        borderRadius="md"
        boxShadow="md"
      >
        <form onSubmit={fetchCreateProfile}>
          <FormControl mb="4" isRequired>
            <FormLabel>ニックネーム (必須)</FormLabel>
            <Input
              placeholder="ニックネームを入力"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4" isRequired>
            <FormLabel>子どもの誕生日 (必須)</FormLabel>
            <Input
              placeholder="生年月日を入力 (例: YYYY-MM-DD)"
              type="date"
              value={kidBirthday}
              onChange={(e) => setKidBirthday(e.target.value)}
            />
            <FormHelperText>例: 2020-01-01</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            colorScheme="orange"
            width="100%"
            disabled={!nickname || !kidBirthday  || !userId}
            isLoading={isLoading}
          >
            プロフィールを作成
          </Button>
        </form>
      </Box>
    </MainLayout>
  );
};