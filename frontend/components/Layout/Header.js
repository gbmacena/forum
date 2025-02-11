"use client";

import { useState, useEffect } from "react";
import { Box, InputBase, Typography, Link } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

const Header = ({ searchInput, onSearchChange }) => {
  const [apelido, setApelido] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const apelido = storedUser.apelido;
    setApelido(apelido);
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "#232328",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        height: "150px",
        borderBottom: "1px solid #2f2f34",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          height: "60px",
          width: "60px",
          backgroundColor: "rgba(47, 47, 52, 1)",
          marginLeft: "100px",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Link href="/home">
          <HomeIcon sx={{ color: "#fff", fontSize: "30px" }} />
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            width: "60%",
          }}
        >
          <Box
            sx={{
              padding: "0 16px",
              height: "100%",
              position: "absolute",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "50px",
            }}
          ></Box>

          {searchInput && (
            <>
              <SearchIcon
                sx={{
                  color: "#fff",
                  position: "absolute",
                  left: "16px",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <InputBase
                placeholder="Pesquisar…"
                value={searchTerm}
                onChange={handleChange}
                sx={{
                  padding: "12px",
                  paddingLeft: "50px",
                  transition: "width 300ms",
                  width: "100%",
                  color: "#fff",
                  backgroundColor: "#2f2f34",
                  fontSize: "16px",
                  zIndex: 0,
                }}
              />
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "100%",
          height: "60px",
          width: "60px",
          backgroundColor: "rgba(47, 47, 52, 1)",
          marginRight: "10px",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Link href="/profile">
          <PersonIcon sx={{ color: "#fff", fontSize: "30px" }} />
        </Link>
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ color: "#fff", marginRight: "100px" }}
      >
        Olá, <strong>{`@${apelido}`}</strong>
      </Typography>
    </Box>
  );
};

export default Header;
