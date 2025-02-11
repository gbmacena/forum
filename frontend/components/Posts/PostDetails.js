import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import postService from "../../services/postService";
import formatarData from "../../utils/formatarData";

const PostDetails = ({ post }) => {
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    open: false,
  });
  const [curtido, setCurtido] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (post?.Curtidas?.length && user?.id) {
      setCurtido(post.Curtidas.some((curtida) => curtida.user_id === user.id));
    }
  }, [post?.Curtidas, user?.id]);

  const handleCurtirPost = async () => {
    if (!post) return;

    try {
      const foiCurtido = (post.Curtidas || curtido(true) || []).some(
        (curtida) => curtida.user_id === user.id
      );

      if (foiCurtido) {
        await postService.removerCurtida(post.id, user.id);
        post.qtd_curtidas -= 1;
        post.Curtidas = post.Curtidas.filter(
          (curtida) => curtida.user_id !== user.id
        );
        setCurtido(false);
      } else {
        await postService.curtirPost(post.id, user.id);
        post.qtd_curtidas += 1;
        post.Curtidas.push({ user_id: user.id });
        setCurtido(true);
      }
    } catch (error) {
      setAlert({
        message: error.message,
        severity: "error",
        open: true,
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlert({ ...alert, open: false });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 6,
      }}
    >
      <Card
        sx={{
          backgroundColor: "#2f2f34",
          borderRadius: 8,
          width: "70%",
        }}
      >
        <CardContent sx={{ color: "#fff", padding: 6 }}>
          <Box display="flex" sx={{ mb: 2 }}>
            <Avatar
              sx={{
                marginRight: 1,
                color: "#2f2f34",
                height: 50,
                width: 50,
              }}
            >
              {post.Usuario?.apelido[0].toUpperCase()}
            </Avatar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle">
                @{post.Usuario?.apelido}
              </Typography>
              <Typography variant="subtitle2">
                {formatarData(post.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            {post.titulo}
          </Typography>
          <Typography
            variant="h6"
            sx={{ whiteSpace: "pre-line", overflowWrap: "break-word" }}
          >
            {post.conteudo}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <IconButton onClick={handleCurtirPost}>
              {post.Curtidas?.some((curtida) => curtida.user_id === user.id) ? (
                <FavoriteIcon sx={{ color: "white" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "white" }} />
              )}
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1, mt: 0.5 }}>
              {post.qtd_curtidas}
            </Typography>
          </Box>
        </CardContent>
      </Card>

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
};

export default PostDetails;
