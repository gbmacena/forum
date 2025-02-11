"use client";

import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Layout/Footer";
import { Box } from "@mui/material";
import PostForm from "../../../components/Posts/PostForm";
import postService from "../../../services/postService";

const CriarPost = () => {
  const criarPost = async (titulo, conteudo, userId) => {
    try {
      const data = await postService.criarPost(titulo, conteudo, userId);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <Box
      component="main"
      sx={{ backgroundColor: "#232328", minHeight: "100vh" }}
    >
      <Header />
      <PostForm titulo={"Criar post"} onSubmit={criarPost} />
      <Footer />
    </Box>
  );
};

export default CriarPost;
