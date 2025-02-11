"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { makeStyles } from "@mui/styles";
import userService from "../services/userService";

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

const Cadastro = () => {
  const classes = useStyles();
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    apelido: "",
    senha: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const router = useRouter();

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
      const { nome, email, apelido, senha } = formulario;
      await userService.register(nome, email, senha, apelido);
      setAlert({
        message: "Cadastro realizado com sucesso!",
        severity: "success",
        open: true,
      });

      setTimeout(() => {
        router.push("/login");
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
        paddingTop: 6,
        height: "100vh",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ color: "#fff" }}>
        Cadastro
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: 500 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="nome"
          label="Nome"
          name="nome"
          autoComplete="nome"
          value={formulario.nome}
          onChange={handleChange}
          variant="filled"
          className={classes.textField}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={formulario.email}
          onChange={handleChange}
          variant="filled"
          className={classes.textField}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="apelido"
          label="Apelido"
          name="apelido"
          autoComplete="apelido"
          value={formulario.apelido}
          onChange={handleChange}
          variant="filled"
          className={classes.textField}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="senha"
          label="Senha"
          type="password"
          id="senha"
          autoComplete="password"
          value={formulario.senha}
          onChange={handleChange}
          variant="filled"
          className={classes.textField}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
        >
          Cadastrar
        </Button>
        <Typography variant="body2" align="center" sx={{ color: "#fff" }}>
          Já tem uma conta?{" "}
          <Link style={{ color: "#4468CF" }} href="/login">
            Entre
          </Link>
        </Typography>
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

export default Cadastro;
