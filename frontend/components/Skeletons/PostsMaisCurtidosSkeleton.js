import { Box, Card, CardContent, Skeleton } from "@mui/material";

const PostsMaisCurtidosSkeleton = () => {
  return (
    <Box>
      {[...Array(5)].map((_, index) => (
        <Card
          key={index}
          sx={{
            marginBottom: 2,
            backgroundColor: "#232328",
            borderRadius: 4,
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="text"
                width="40%"
                height={33}
                sx={{ textAlign: "center" }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Skeleton
                  variant="circular"
                  width={24}
                  height={24}
                  sx={{
                    mr: 1,
                    ml: 1,
                  }}
                />
                <Skeleton variant="text" width={30} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostsMaisCurtidosSkeleton;
