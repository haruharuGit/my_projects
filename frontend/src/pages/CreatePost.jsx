import React, { useState } from 'react';
import { Box, Button, Input, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout'

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:3010/api/v1/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('投稿が成功しました！');
        setContent('');
        setImage(null);
      } else {
        const errorData = await response.json();
        alert(`投稿に失敗しました: ${errorData.errors.join(', ')}`);
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
      alert('投稿に失敗しました。');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>画像を選択してください</FormLabel>
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
