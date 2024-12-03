import { Box } from '@chakra-ui/react'
import Header from './Header'

const MainLayout = ({ children }) => {
  return (
    <Box minH='100vh' bg='gray.50'>
      <Header />
      <Box>{children}</Box>
    </Box>
  )
}

export default MainLayout