"use client";

import Header from "../../../../components/Layout/Header";
import Footer from "../../../../components/Layout/Footer";
import { Box } from "@mui/material";
import PostForm from "../../../../components/Posts/PostForm";
import { useParams } from "next/navigation";
import postService from "../../../../services/postService";

const EditarPost = () => {
  const { id } = useParams();

  const editarPost = async (id, titulo, conteudo, userId) => {
    try {
      const data = await postService.editarPost(id, titulo, conteudo, userId);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Box component="main" sx={{ backgroundColor: "#232328" }}>
      <Header />
      <PostForm titulo={"Editar post"} id={id} onSubmit={editarPost} />
      <Footer />
    </Box>
  );
};

export default EditarPost;
