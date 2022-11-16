import React from "react";
import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

async function fetchData() {
  const data = await axios.get("https://api.imgflip.com/get_memes");
  return data;
}

export default function ImagePage() {
  const { error, isLoading, data, refetch } = useQuery("repoData", fetchData, {
    refetchOnWindowFocus: false
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Box textAlign="center">
        <Button variant="contained" onClick={refetch}>
          Refresh
        </Button>
      </Box>
      <ImageList variant="masonry" cols={3} gap={8}>
        {data?.data.data.memes.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.url} alt={item.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
