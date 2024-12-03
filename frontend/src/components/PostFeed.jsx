import { VStack } from '@chakra-ui/react'
import Post from './Post'

const PostFeed = ({ posts }) => {
  return (
    <VStack spacing={4} align='stretch' w='100%'>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </VStack>
  )
}

export default PostFeed
