import { Box, VStack, HStack, Text, Image, Avatar } from '@chakra-ui/react'
// import PostReactions from './PostReactions'

const Post = ({ post }) => {
  return (
    <Box 
      bg='white' 
      borderRadius='lg'
      p={4}
      shadow='sm'
      mb={4}
    >
      <VStack align='stretch' spacing={3}>
        <HStack>
          <Avatar size='sm' name={post.user ? post.user.name : 'Anonymous'} src={post.user ? post.user.avatar_url : ''} />
          <Text fontWeight='bold'>{post.user ? post.user.name : 'Anonymous'}</Text>
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
