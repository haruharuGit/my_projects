import React from "react";
import { Box, Flex, Heading, Button, Avatar } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";

// import Link from "next/link"

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log("Logout response:", response);
      navigate("/signin");
    } catch (error) {
      if (error.response) {
        console.log("Server error:", error.response.data);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };
  
  return (
    <Box as="header" position="sticky" top={0} zIndex={50} border="none" bg="#FEBE6A" >
      <Flex h="14" alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto" px={4}>
        {/* <Link href="/" passHref> */}
          <Heading as="h1" size="lg">
            いや！シェア
          </Heading>
        {/* </Link> */}
        <Flex alignItems="center" gap={4}>
          <Button onClick={handleLogout}>ログアウト</Button>  {/*variant="ghost" 一旦削除*/}
          <Avatar size="sm" name="User" src="/placeholder.svg" />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
