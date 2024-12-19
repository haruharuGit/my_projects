import React from "react";
import { Box, Flex, Heading, Button, Avatar } from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../api/auth";

const Header = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ログイン、ログアウトに応じたログアウトボタンの表示
  const hideLogoutPaths = ["/signup", "/signin", "/profile/create"];
  const shouldHideLogout = hideLogoutPaths.includes(location.pathname);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log("Server error:", error.response.data);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  const handleAvatarClick = () => {
    navigate(`/user/${userId}`);
  };

  const handleLogoClick = () => {
    navigate(userId ? "/index" : "/");
  };
  
  return (
    <Box as="header" position="sticky" top={0} zIndex={50} border="none" bg="#FEBE6A" >
      <Flex h="14" alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto" px={4}>
        <Heading as="h1" size="lg" onClick={handleLogoClick} cursor="pointer">
          いや！シェア
        </Heading>
        <Flex alignItems="center" gap={4}>
          {!shouldHideLogout && (
            <>
              <Button variant="ghost" onClick={handleLogout}>ログアウト</Button>
              <Avatar size="sm" name="User" src="/placeholder.svg" onClick={handleAvatarClick} />
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
