import { Box, Card, CardContent, Skeleton } from "@mui/material";

const postsSkeleton = () => {
  return (
    <Box>
      {[...Array(5)].map((_, index) => (
        <Card
          key={index}
          sx={{
            backgroundColor: "#2f2f34",
            marginBottom: 2,
            borderRadius: 8,
            margin: 6,
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
            height: 300,
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
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                sx={{ marginRight: 1, color: "#2f2f34" }}
              />
              <Skeleton variant="text" width="5%" />
            </Box>
            <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="80%" height={30} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width="3%" sx={{ ml: 2 }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default postsSkeleton;
