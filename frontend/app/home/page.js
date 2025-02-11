"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Layout/Header";
import PostsMaisCurtidos from "../../components/Posts/PostsMaisCurtidos";
import Posts from "../../components/Posts/Posts";
import AddPostButton from "../../components/Buttons/AddPostButton";
import Footer from "../../components/Layout/Footer";
import postService from "../../services/postService";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTimeLinePosts = async () => {
    try {
      const data = await postService.listarPosts(searchTerm);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#232328",
      }}
    >
      <Header searchInput={true} onSearchChange={setSearchTerm} />
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 210px)",
        }}
      >
        <PostsMaisCurtidos />
        <Posts width={"70%"} fetchPosts={fetchTimeLinePosts} />
        <AddPostButton />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
