import React from "react";
import { Box, Flex, Heading, Button, Avatar } from "@chakra-ui/react"
import { useNavigate,useLocation } from "react-router-dom";
import { logoutUser } from "../api/auth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideLogoutPaths = ["/home", "/signup", "/signin", "/profile/create"];
  const shouldHideLogout = hideLogoutPaths.includes(location.pathname);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log("Logout response:", response);
      navigate("/home");
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
        <Heading as="h1" size="lg">
          いや！シェア
        </Heading>
        <Flex alignItems="center" gap={4}>
          {!shouldHideLogout && (
            <>
              <Button variant="ghost" onClick={handleLogout}>ログアウト</Button>
              <Avatar size="sm" name="User" src="/placeholder.svg" />
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
