import { Typography } from "@mui/material";

const PostCount = ({ count }) => {
  return (
    <Typography variant="h4" sx={{ color: "#fff", mt: 6 }}>
      {`Meus posts 📝 (${count})`}
    </Typography>
  );
};

export default PostCount;
