import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ActivatePage() {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const activationString = searchParams.get("activationString");

  const navigate = useNavigate();

  const onActivate = async () => {
    const response = await axios
      .post(
        "http://localhost:4000/activate",
        {},
        {
          params: { email, activationString }
        }
      )
      .catch((error) => console.error("There was an error!", error));

    console.log(email);
    console.log(activationString);
    console.log(response);
    if (response.status === 200)
      navigate("/login", { state: response.message });
  };

  useEffect(() => {
    onActivate();
  }, []);

  return (
    <Box sx={{ maxWidth: "xs" }}>
      <Typography
        variant="h3"
        component="div"
        textTransform="uppercase"
        align="center"
        sx={{ flexGrow: 1 }}
      >
        Your account is being verified
      </Typography>
      <Typography
        variant="h6"
        component="div"
        align="center"
        sx={{ flexGrow: 1 }}
      >
        Please wait for a moment...
      </Typography>
    </Box>
  );
}
