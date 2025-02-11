import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/navigation";
import postService from "../../services/postService";

const useStyles = makeStyles({
  textField: {
    "& .MuiFilledInput-root": {
      backgroundColor: "#2f2f34",
      "&:hover": {
        backgroundColor: "#3a3a3f",
      },
      "&.Mui-focused": {
        backgroundColor: "#3a3a3f",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputBase-input": {
      color: "#fff",
    },
  },
});

const PostForm = ({ titulo, onSubmit, id }) => {
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [formulario, setFormulario] = useState({
    titulo: "",
    conteudo: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    open: false,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser;
    setUser(user);

    const fetchPostData = async () => {
      if (id === undefined) return;
      try {
        const data = await postService.listarUmPost(id);
        setFormulario(data);
      } catch (error) {
        setAlert({
          message: "Erro ao carregar post",
          severity: "error",
          open: true,
        });
      }
    };
    fetchPostData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { titulo, conteudo } = formulario;

      if (id !== undefined) {
        await onSubmit(id, titulo, conteudo);
        setAlert({
          message: "Post atualizado com sucesso!",
          severity: "success",
          open: true,
        });
        setTimeout(() => {
          router.push(`/posts/${id}`);
        }, 2000);
        return;
      }
      await onSubmit(titulo, conteudo, user.id);
      setAlert({
        message: "Post criado com sucesso!",
        severity: "success",
        open: true,
      });

      setTimeout(() => {
        router.push("/home");
      }, 2000);
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#232328",
        margin: 6,
        height: "70vh",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ color: "#fff" }}>
        {titulo} 📝
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: 500 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="titulo"
          label="Título"
          name="titulo"
          autoComplete="titulo"
          value={formulario.titulo}
          onChange={handleChange}
          variant="filled"
          className={classes.textField}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="conteudo"
          label="Conteúdo"
          name="conteudo"
          autoComplete="conteudo"
          multiline
          rows={10}
          value={formulario.conteudo}
          onChange={handleChange}
          variant="filled"
          className={classes.textField}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          {titulo.split(" ")[0].toUpperCase()}
        </Button>
      </Box>
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

export default PostForm;
