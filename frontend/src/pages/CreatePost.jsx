import React, { useState } from 'react';
import { Box, Button, Input, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import MainLayout from '../layouts/MainLayout'
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);

  const handleContentChange = event => setContent(event.target.value);

  const handleImageChange = event => setImage(event.target.files[0]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('post[content]', content);
    formData.append('post[image]', image);

    try {
      const response = await fetch('http://localhost:3010/api/v1/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        setSubmittedData([...submittedData, data]);
        console.log("投稿が成功しました")
        setContent('');
        setImage(null);
        navigate('/'); 
      } else {
        console.log("保存に失敗しました")
        const errorData = await response.json();
        alert(`投稿に失敗しました: ${errorData.errors.join(', ')}`);
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
