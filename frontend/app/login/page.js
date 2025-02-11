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

const Login = () => {
  const classes = useStyles();
  const [formulario, setFormulario] = useState({
    email: "",
    senha: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(
        formulario.email,
        formulario.senha
      );

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", JSON.stringify(response.token));

      setAlert({
        message: "Login efetuado com sucesso!",
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
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: 500 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={formulario.email}
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
          autoComplete="current-password"
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
          Entrar
        </Button>
        <Typography variant="body2" align="center" sx={{ color: "#fff" }}>
          Não possui uma conta?{" "}
          <Link style={{ color: "#4468CF" }} href="/">
            Cadastre-se
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

export default Login;
