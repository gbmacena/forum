import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#232328",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        height: 60,
        textAlign: "center",
        width: "100%",
        borderTop: "1px solid #2f2f34",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Forum. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
