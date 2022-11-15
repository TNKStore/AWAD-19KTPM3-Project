import React from "react";
import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import { useQuery } from "react-query";

export default function ImagePage() {
  const { error, isLoading, data, refetch } = useQuery("repoData", () =>
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      console.log("Refresh");
      return res.json();
    })
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Box textAlign="center">
          <Button variant="contained" onClick={refetch}>
            Refresh
          </Button>
        </Box>
        <ImageList variant="masonry" cols={3} gap={8}>
          {data?.data.memes.map((item) => (
            <ImageListItem key={item.img}>
              <img src={item.url} alt={item.title} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}
