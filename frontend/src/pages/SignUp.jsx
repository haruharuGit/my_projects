import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3010/api/v1/auth",
        formData
      );

      console.log("User signed up successfully:", response.data);

      // トークンをlocalStorageに保存
      localStorage.setItem("access-token", response.headers["access-token"]);
      localStorage.setItem("client", response.headers["client"]);
      localStorage.setItem("uid", response.headers["uid"]);
      setFormData({
        email: "",
        password: "",
        password_confirmation: "",
      });
      navigate('/'); 
    } catch (err) {
      console.error("Error during signup:", err.response.data.errors);
      setError(err.response.data.errors.full_messages.join(", "));
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
      {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">メールアドレス (必須)</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="メールアドレスを入力"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">パスワード (必須)</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="パスワードを入力"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password_confirmation">パスワード (確認用)</FormLabel>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="パスワード(確認用)を入力"
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
