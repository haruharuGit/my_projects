import { Box, VStack, HStack, Text, Image, Avatar, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/react'
import { useState } from 'react';

const Post = ({ post }) => {
  const emojis = ["👍", "🩷", "😂", "😮", "😢"];
  const [selectedEmojis, setSelectedEmojis] = useState([]);

  const onClickReaction = (emoji) => {
    if(!selectedEmojis.includes(emoji)) {
      setSelectedEmojis((prev) => [...prev, emoji]);
    }
  };

  return (
    <Box 
      bg='#FDF6F0' 
      borderRadius='32'
      p={4}
      shadow='sm'
      mb={4}
    >
      <VStack align='stretch' spacing={3}>
        <HStack>
          <Avatar size='sm' src={post.avatar_url ? post.avatar_url : "" } />
          <Text fontWeight='bold'>{post.nickname ? post.nickname : 'Anonymous'}</Text>
        </HStack>
        
        <Text>{post.content}</Text>
        
        {post.image_url && (
          <Image
            src={post.image_url}
            alt="Post image"
            borderRadius='md'
            w='100%'
            fallbackSrc="https://via.placeholder.com/300x200?text=Image+not+available"
          />
        )}

        <HStack mt={2}>
          {selectedEmojis.map((emoji, index) => (
            <Text key={index} fontSize="2xl">{emoji}</Text>
          ))}
        </HStack>

        <Popover>
          <PopoverTrigger>
            <Button w='20' colorScheme='yellow'>応援する</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>{emojis.map((emoji) => (<Button key={emoji} onClick={() => onClickReaction(emoji)}>{emoji}</Button>))}</PopoverBody>
          </PopoverContent>
        </Popover>
      </VStack>
    </Box>
  )
}

export default Post
