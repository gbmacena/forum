"use client";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ProfileContent from "../../components/Profile/ProfileContent";
import Posts from "../../components/Posts/Posts";
import AddPostButton from "../../components/Buttons/AddPostButton";
import userService from "../../services/userService";
import PostCount from "../../components/Profile/PostCount";

const Profile = () => {
  const [postCount, setPostCount] = useState(0);

  const fetchUserPosts = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser.id;
      const data = await userService.listarPosts(userId);
      const posts = Array.isArray(data.Posts) ? data.Posts : [];
      setPostCount(posts.length);
      return posts;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <Box component="main">
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#232328",
        }}
      >
        <ProfileContent />
        <PostCount count={postCount} />
        <Posts width={"70%"} fetchPosts={fetchUserPosts} profilePost={true} />
        <AddPostButton />
      </Box>
      <Footer />
    </Box>
  );
};

export default Profile;
