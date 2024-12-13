import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleContentChange = event => setContent(event.target.value);
  const handleImageChange = event => setImage(event.target.files[0]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/check_user_id`, {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'client': localStorage.getItem('client'),
            'uid': localStorage.getItem('uid'),
          }
        });

        if (response.status === 200) {
          setUserId(response.data.id);
        } else {
          console.error('認証情報が見つかりません');
          alert('認証情報が見つかりません。ログインし直してください。');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        alert('ユーザーIDの取得に失敗しました。');
      }
    };

    fetchUserId();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      console.error('ユーザーが認証されていません');
      alert('認証されていません。ログインしてください。');
      return;
    }

    const formData = new FormData();
    formData.append('post[content]', content);
    formData.append('post[image]', image);
    formData.append('post[user_id]', userId);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, formData, {
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'client': localStorage.getItem('client'),
          'uid': localStorage.getItem('uid'),
        }
      });

      if (response.status === 201) {
        const data = response.data;
        setSubmittedData([...submittedData, data]);
        console.log("投稿が成功しました");
        setContent('');
        setImage(null);
        navigate('/index');
      } else {
        console.log("保存に失敗しました");
        alert('投稿に失敗しました');
      }
    } catch (error) {
      console.log('エラーが発生しました:', error);
      alert('投稿に失敗しました。');
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
          <FormControl mb="4">
            <FormLabel>文字を入力してください (任意)</FormLabel>
            <Textarea
              placeholder="投稿内容を入力"
              type="text"
              value={content}
              onChange={handleContentChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>画像を選択してください (必須)</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </FormControl>
          <Button type="submit" colorScheme="orange" width="100%">
            投稿する
          </Button>
        </form>
      </Box>
    </MainLayout>
  );
};

export default CreatePost;
