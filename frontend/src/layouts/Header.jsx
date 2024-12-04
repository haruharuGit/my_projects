import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box bg='#FEBE6A' py={4} px={6}>
      <Flex justify='space-between' align='center'>
        <Link to="/">
          <Heading size='lg' as='h1'>リアルTWO</Heading>
        </Link>
        <Button variant='ghost'>ログアウト</Button>
      </Flex>
    </Box>
  )
}

export default Header
