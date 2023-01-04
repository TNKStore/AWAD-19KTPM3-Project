/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getLocalStorage } from "../utils/localStorage";
import ErrorView from "../components/errorView";

export default function InvitePage() {
  const [isErrorViewShow, setIsErrorViewShow] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const group = searchParams.get("group");
  const invitationString = searchParams.get("invitationString");
  const token = getLocalStorage("token");

  const inviteUser = async () => {
    const headers = {
      "x-access-token": token
    };

    const data = {};

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/group/invite`, data, {
        headers,
        params: { group, invitationString }
      })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const handleInviteUser = async () => {
    const response = await inviteUser();

    if (response?.status === 200)
      navigate(`/groups/${group}`, { state: { groupID: group } });
    else setIsErrorViewShow(true);
  };

  const handleCloseError = () => {
    // Do nothing
  };

  useEffect(() => {
    handleInviteUser();
  }, []);

  return (
    <Box sx={{ maxWidth: "xs" }}>
      <ErrorView
        isErrorShow={isErrorViewShow}
        handleCloseError={handleCloseError}
        errorMessage="Something is wrong with the verification stage, please try again later."
      />
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
