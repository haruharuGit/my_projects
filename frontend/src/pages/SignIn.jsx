import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout'
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const { headers } = response;

      localStorage.setItem("access-token", headers["access-token"]);
      localStorage.setItem("client", headers["client"]);
      localStorage.setItem("uid", headers["uid"]);

      alert('ログインに成功しました');
      navigate('/');
    } catch (error) {
      console.error("ログインに失敗しました", error.response?.data || error.message);
      alert("ログインに失敗しました");
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
        <h2>ログイン</h2>
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
          <Button type="submit" colorScheme="orange" width="100%">
            ログイン
          </Button>
        </form>
      </Box>
    </MainLayout>
  );
};

export default SignIn;
