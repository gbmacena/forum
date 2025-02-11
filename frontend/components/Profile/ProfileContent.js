import { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import userService from "../../services/userService";

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

const ProfileContent = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    apelido: "",
    profissao: "",
    senha: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    open: false,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setFormulario({
      nome: storedUser.nome || "",
      email: storedUser.email || "",
      apelido: storedUser.apelido || "",
      profissao: storedUser.profissao || "",
      senha: "",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, apelido, profissao, senha } = formulario;

    try {
      await userService.atualizarUser(
        user.id,
        nome,
        email,
        senha,
        apelido,
        profissao
      );

      const updatedUser = {
        id: user.id,
        nome,
        email,
        apelido,
        profissao,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setAlert({
        message: "Perfil atualizado com sucesso!",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <Box
      component="main"
      sx={{
        padding: 6,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        backgroundColor: "#232328",
        color: "#fff",
        borderBottom: "1px solid #2f2f34",
      }}
    >
      <Avatar
        sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
        }}
      />
      <Typography variant="h6">{user.nome}</Typography>
      <Box
        component="form"
        sx={{
          width: "100%",
          width: 500,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          variant="filled"
          fullWidth
          id="nome"
          label="Nome"
          name="nome"
          autoComplete="nome"
          value={formulario.nome}
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          margin="normal"
          required
          variant="filled"
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={formulario.email}
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          margin="normal"
          required
          variant="filled"
          fullWidth
          id="apelido"
          label="Apelido"
          name="apelido"
          autoComplete="apelido"
          value={formulario.apelido}
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          margin="normal"
          variant="filled"
          fullWidth
          id="profissao"
          label="Profissão"
          name="profissao"
          autoComplete="profissao"
          value={formulario.profissao}
          onChange={handleChange}
          className={classes.textField}
        />
        <TextField
          margin="normal"
          required
          variant="filled"
          fullWidth
          name="senha"
          label="Senha"
          type="password"
          id="senha"
          autoComplete="current-password"
          value={formulario.senha}
          onChange={handleChange}
          className={classes.textField}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
          size="large"
        >
          Atualizar
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

export default ProfileContent;
