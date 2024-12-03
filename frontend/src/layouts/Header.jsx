import { Box, Flex, Heading, Button } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box bg='#FEBE6A' py={4} px={6}>
      <Flex justify='space-between' align='center'>
        <Heading size='lg'>リアルTWO</Heading>
        <Button variant='ghost'>ログアウト</Button>
      </Flex>
    </Box>
  )
}

export default Header
