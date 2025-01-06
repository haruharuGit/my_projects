import { Box, VStack, HStack, Text, Image, Avatar } from '@chakra-ui/react'
// import PostReactions from './PostReactions'

const Post = ({ post }) => {
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
        
        {/* <PostReactions post={post} /> */}
      </VStack>
    </Box>
  )
}

export default Post
