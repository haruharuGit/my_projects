import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreateProfile = () => {
  const [nickname, setNickname] = useState('');
  const [kidBirthday, setKidBirthday] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // current_userのidをrailsから取得
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api/v1/users/check_user');
        if (response.status === 200) {
          setUserId(response.data.user_id);
        }
      } catch (error) {
        console.error('ユーザーIDの取得に失敗しました:', error);
        alert('ユーザーIDの取得に失敗しました');
      }
    };

    fetchUserId();
  }, []);

  const handleNicknameChange = (event) => setNickname(event.target.value);
  const handleKidBirthdayChange = (event) => setKidBirthday(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      alert('ユーザー情報が取得できませんでした');
      return;
    }

    const profileData = {
      profile: {
        nickname,
        kid_birthday: kidBirthday,
        user_id: userId
      }
    };

    try {
      const response = await axios.post(
        'http://localhost:3010/api/v1/profiles',
        profileData
      );

      if (response.status === 200) {
        console.log("プロフィールが作成されました:", response.data);
        setNickname('');
        setKidBirthday('');
        navigate('/');
      } else {
        console.log("保存に失敗しました");
        alert('プロフィール作成に失敗しました。');
      }
    } catch (error) {
      console.log('エラーが発生しました:', error);
      const errorMessage = error.response?.data?.message || 'プロフィール作成に失敗しました。';
      alert('プロフィール作成に失敗しました。', errorMessage);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <FormControl mb="4" isRequired>
            <FormLabel>ニックネーム (必須)</FormLabel>
            <Input
              placeholder="ニックネームを入力"
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </FormControl>
          <FormControl mb="4" isRequired>
            <FormLabel>子どもの生年月日 (必須)</FormLabel>
            <Input
              placeholder="生年月日を入力 (例: YYYY-MM-DD)"
              type="date"
              value={kidBirthday}
              onChange={handleKidBirthdayChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="orange" width="100%">
            プロフィールを作成
          </Button>
        </form>
      </Box>
    </MainLayout>
  );
};

export default CreateProfile;
