import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function fetchCreateUser(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password || !password_confirmation) {
        alert('名前、メールアドレス、パスワードを入力して下さい。');
        return;
      }

      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth`, {
        email, password, password_confirmation
      });

      if (!res.status || (res.status < 200 && res.status >= 300)) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      localStorage.setItem('access-token', res.data['access_token']);
      localStorage.setItem('client', res.data['client']);
      localStorage.setItem('uid', res.data['uid']);

      console.log(localStorage.getItem('access-token'));
      console.log(localStorage.getItem('client'));
      console.log(localStorage.getItem('uid'));

      alert('新規登録しました。');
      navigate('/profile/create');
    }
    catch (error) {
      console.error('Error creating credos:', error);
      alert('新規登録に失敗しました。');
    }
    finally {
      setIsLoading(false);
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
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
      <h2>アカウント登録</h2>
      <form onSubmit={fetchCreateUser}>
        <FormControl isRequired>
          <FormLabel>メールアドレス (必須)</FormLabel>
          <Input
            value={email}
            placeholder="メールアドレスを入力"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>パスワード (必須)</FormLabel>
          <Input
            type="password"
            value={password}
            placeholder="パスワードを入力"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>パスワード (確認用)</FormLabel>
          <Input
            type="password"
            value={password_confirmation}
            placeholder="パスワード(確認用)を入力"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </FormControl>
        <Button
          colorScheme="orange"
          width="100%"
          isLoading={isLoading} 
          disabled={!email || !password || !password_confirmation}
          type="submit"
        >
          登録する
        </Button>
      </form>
      </Box>
    </MainLayout>
  );
};