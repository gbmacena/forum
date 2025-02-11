import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import postsSkeleton from "../Skeletons/PostsSkeleton";
import { useRouter } from "next/navigation";
import postService from "../../services/postService";
import formatarData from "../../utils/formatarData";

const Posts = ({ width, fetchPosts, profilePost, onPostDelete }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser;
    setUser(user);
  }, []);

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setAlert({
          message: "Erro ao carregar posts",
          severity: "error",
          open: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, [fetchPosts]);

  const handlePostClick = (id, ev) => {
    if (ev.target.closest("button")) return;

    router.push(`/posts/${id}`);
  };

  const handleEdit = (postId, ev) => {
    ev.stopPropagation();
    router.push(`/posts/editar/${postId}`);
  };

  const handleDelete = async (postId, ev) => {
    ev.stopPropagation();
    try {
      await postService.deletarPost(postId);
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
      setAlert({
        message: "Post deletado com sucesso!",
        severity: "success",
        open: true,
      });
    } catch (error) {
      setAlert({
        message: error.message,
        severity: "error",
        open: true,
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  const renderedPosts = posts.map((post) => (
    <Card
      key={post.id}
      onClick={(ev) => handlePostClick(post.id, ev)}
      sx={{
        backgroundColor: "#2f2f34",
        borderRadius: 8,
        margin: 6,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent
        className="card-content"
        sx={{
          backgroundColor: "#2f2f34",
          height: 300,
          padding: 6,
          color: "#fff",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{
            mb: 2,
          }}
        >
          {post.Usuario ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  marginRight: 1,
                  color: "#2f2f34",
                  height: 50,
                  width: 50,
                }}
              >
                {post.Usuario.apelido
                  ? post.Usuario.apelido[0].toUpperCase()
                  : "U"}
              </Avatar>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle">
                  @{post.Usuario.apelido}
                </Typography>
                <Typography variant="subtitle2">
                  {formatarData(post.createdAt)}
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              <Avatar
                sx={{
                  marginRight: 1,
                  color: "#2f2f34",
                  height: 50,
                  width: 50,
                }}
              >
                {user.apelido[0].toUpperCase()}
              </Avatar>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle">@{user.apelido}</Typography>
                <Typography variant="subtitle2" sx={{ minWidth: "500px" }}>
                  {formatarData(post.createdAt)}
                </Typography>
              </Box>
              {profilePost && (
                <Box
                  sx={{ width: "100%", display: "flex", justifyContent: "end" }}
                >
                  <IconButton onClick={(ev) => handleEdit(post.id, ev)}>
                    <EditIcon sx={{ color: "#fff" }} />
                  </IconButton>
                  <IconButton onClick={(ev) => handleDelete(post.id, ev)}>
                    <DeleteIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Box>
              )}
            </>
          )}
        </Box>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {post.titulo}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.conteudo}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FavoriteIcon sx={{ mt: 3 }} />
          <Typography variant="h6" sx={{ ml: 1, mt: 2.5 }}>
            {post.qtd_curtidas}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  ));
  return (
    <Box
      sx={{
        width,
      }}
    >
      {loading ? (
        loadingPosts()
      ) : posts.length === 0 ? (
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            m: 6,
            color: "#fff",
          }}
        >
          Nenhum post encontrado 👎.
        </Typography>
      ) : (
        renderedPosts
      )}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );

  function loadingPosts() {
    return postsSkeleton();
  }
};

export default Posts;
