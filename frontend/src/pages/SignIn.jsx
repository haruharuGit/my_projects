import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Text } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const navigate = useNavigate();


  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (!email || !password) {
        setMessage('メールアドレス、パスワードを入力をして下さい。');
        setMessageStatus('error');
        return;
    }

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/sign_in`, {
      email, password
    });

    if (!res.status || (res.status < 200 && res.status >= 300)) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    localStorage.setItem('access-token', res.headers['access-token']);
    localStorage.setItem('client', res.headers['client']);
    localStorage.setItem('uid', res.headers['uid']);

    console.log(localStorage.getItem('access-token'));
    console.log(localStorage.getItem('client'));
    console.log(localStorage.getItem('uid'));

    setMessage('ログインしました。');
    setMessageStatus('success');
    navigate('/index');
    }
    catch (error) {
      console.error('Error creating credos:', error);
      setMessage('ログインに失敗しました。');
      setMessageStatus('error');
    }
    finally {
      setIsLoading(false);
      setEmail('');
      setPassword('');
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
        {message && (
          <Text color={messageStatus === 'error' ? 'red.500' : 'green.500'} mb="4">
            {message}
          </Text>
        )}
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            colorScheme="orange"
            width="100%"
            isLoading={isLoading}
            disabled={!email || !password}
          >
            ログイン
          </Button>
        </form>
      </Box>
    </MainLayout>
  );
};
