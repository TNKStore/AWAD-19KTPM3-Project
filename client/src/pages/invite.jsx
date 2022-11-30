/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getLocalStorage } from "../utils/localStorage";

export default function InvitePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const group = searchParams.get("group");
  const invitationString = searchParams.get("invitationString");
  const token = getLocalStorage("token");

  const onActivate = async () => {
    const headers = {
      "x-access-token": token
    };

    const data = {};

    const response = await axios
      .post("http://localhost:4000/group/invite", data, {
        headers,
        params: { group, invitationString }
      })
      .catch((error) => console.error("There was an error!", error));

    console.log(response);
    if (response.status === 200)
      navigate(`/groups/${group}`, { state: { groupID: group } });
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
        You are being redrected to the group
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
