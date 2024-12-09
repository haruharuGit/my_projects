import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout'
import { useNavigate } from "react-router-dom";
import { registerUser } from '../api/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(email, password, passwordConfirmation);
      const { headers } = response;

      localStorage.setItem("access-token", headers["access-token"]);
      localStorage.setItem("client", headers["client"]);
      localStorage.setItem("uid", headers["uid"]);

      alert('登録が成功しました');
      navigate('/'); 
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("登録に失敗しました");
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
      <h2>アカウント登録</h2>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="email">メールアドレス (必須)</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="メールアドレスを入力"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">パスワード (必須)</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="パスワードを入力"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password_confirmation">パスワード (確認用)</FormLabel>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password_confirmation"
            value={passwordConfirmation}
            placeholder="パスワード(確認用)を入力"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="orange" width="100%">
          登録する
        </Button>
      </form>
      </Box>
    </MainLayout>
  );
};

export default SignUp;
