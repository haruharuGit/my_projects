import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  VStack,
  Image,
  useColorModeValue,
  Link
} from '@chakra-ui/react'

export default function LandingPage() {
  const bgColor = useColorModeValue('pink.50', 'gray.900')
  const buttonBgColor = useColorModeValue('#F5C088', '#F5C088')
  const buttonHoverBgColor = useColorModeValue('#E5B078', '#E5B078')

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" h="100vh">
        <Grid templateColumns="repeat(2, 1fr)" gap={0} h="100%">
          <GridItem display="flex" justifyContent="center" alignItems="center">
            <VStack spacing={8} align="center" maxW="80%">
              <Heading
                as="h1"
                fontSize={{ base: '4xl', lg: '5xl' }}
                fontWeight="bold"
                textAlign="center"
              >
                いや！シェア
              </Heading>
              <Text 
                fontSize={{ base: 'md', lg: 'lg' }} 
                textAlign="center"
                whiteSpace="pre-wrap"
              >
                {`イヤイヤ期が大変で育児が辛い
    そう思ったことはありませんか？
    イヤイヤ期の子どもを持つ親同士で
    励まし合うSNS「リアルTWO」
    今だけの貴重な時期を支え合って
    楽しく成長を見守りましょう`}
              </Text>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                justify="center"
                w="full"
              >
                <Link href="/signup" passHref>
                  <Button
                    size="lg"
                    bg={buttonBgColor}
                    color="white"
                    _hover={{ bg: buttonHoverBgColor }}
                    fontSize="xl"
                    py={6}
                    px={8}
                    rounded="full"
                  >
                    登録する
                  </Button>
                </Link>
                <Link href="/signin" passHref>
                  <Button
                    size="lg"
                    bg={buttonBgColor}
                    color="white"
                    _hover={{ bg: buttonHoverBgColor }}
                    fontSize="xl"
                    py={6}
                    px={8}
                    rounded="full"
                  >
                    ログイン
                  </Button>
                </Link>
              </Stack>
            </VStack>
          </GridItem>

          <GridItem display="flex" justifyContent="center" alignItems="center">
            <Box maxW="80%">
              <Image
                src="./images/familyForHome.png"
                alt="家族のイラスト"
                objectFit="contain"
                w="100%"
                h="auto"
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

