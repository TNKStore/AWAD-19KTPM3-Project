/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import axios from "axios";
import { GROUP_DETAIL_HEADER } from "../constant/header";
import { getLocalStorage } from "../utils/localStorage";

export default function GroupDetail() {
  const location = useLocation();

  const [groupID, setGroupID] = useState("");
  const [groupName, setGroupName] = useState("");
  const [invitationString, setInvitationString] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const token = getLocalStorage("token");

  const fetchMembers = async () => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .get(`${process.env.REACT_APP_DOMAIN}/group/${groupID}`, { headers })
      .catch((error) => console.error("There was an error!", error));

    if (response.status === 200) {
      const resData = response.data.group;
      setGroupName(resData.groupName);
      setGroupMembers(resData.users);
      setShouldRefetch(false);
    }
  };

  const getInvitationLink = async () => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .get(
        `${process.env.REACT_APP_DOMAIN}/group/invitation-link?group=${groupID}`,
        {
          headers
        }
      )
      .catch((error) => console.error("There was an error!", error));

    if (response.status === 200) {
      setInvitationString(response.data.link);
    }
  };

  useEffect(() => {
    if (location.state !== null) {
      setGroupID(location.state.groupID);
    }
  }, [groupID]);

  useEffect(() => {
    if (groupID !== "" && shouldRefetch) {
      fetchMembers({});
      getInvitationLink({});
    }
  }, [groupID, shouldRefetch]);

  const sendInvitationEmail = async () => {
    const headers = {
      "x-access-token": token
    };

    const data = {
      groupId: groupID,
      email: inviteEmail
    };

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/group/invite/send`, data, {
        headers
      })
      .catch((error) => console.error("There was an error!", error));

    if (response.status === 200) {
      setIsDialogOpen(false);
    }
  };

  const handleChooseDetail = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    const headers = {
      "x-access-token": token
    };

    const data = {
      groupId: groupID,
      memberId: id
    };

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/member/kick`, data, {
        headers
      })
      .catch((error) => console.error("There was an error!", error));

    if (response.status === 200) {
      setShouldRefetch(true);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddUser = () => {
    setIsDialogOpen(true);
  };

  const handleChangeInviteEmail = (e) => {
    setInviteEmail(e.target.value);
  };

  return (
    <Box component="main">
      <Dialog maxWidth="1000px" open={isDialogOpen} onClose={handleClose}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="1000px"
          height="300px"
        >
          <Typography>
            <Typography variant="span" sx={{ fontWeight: "800" }}>
              {`Invite link: `}
            </Typography>
            {invitationString}
          </Typography>

          <Typography
            variant="span"
            sx={{ fontWeight: "800", marginTop: "20px" }}
          >
            Email
          </Typography>
          <TextField
            sx={{ m: 1, width: "50ch" }}
            onChange={handleChangeInviteEmail}
          />
          <Button
            sx={{ marginTop: "20px" }}
            onClick={sendInvitationEmail}
            variant="outlined"
          >
            Send
          </Button>
        </Box>
      </Dialog>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="10px"
        bgcolor="#f6f6f6"
        borderRadius="5px"
      >
        <Box>
          <Typography>
            <Typography variant="span" sx={{ fontWeight: "800" }}>
              {`Group name: `}
            </Typography>
            {groupName}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin="0 15px 0 0"
        >
          <Button onClick={handleAddUser} variant="outlined">
            <AddToPhotosIcon />
          </Button>
        </Box>
      </Box>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              {GROUP_DETAIL_HEADER.map((header) => (
                <TableCell sx={{ fontWeight: "900" }}>{header.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {groupMembers.map((da) => (
              <TableRow onClick={() => handleChooseDetail(da.id)}>
                <TableCell>
                  {`${da.firstName} ${da.lastName}`}
                  <div className="italic">{da.email}</div>
                </TableCell>
                <TableCell>{da.member.role}</TableCell>
                <TableCell sx={{ maxWidth: "10px" }}>
                  <Button onClick={() => handleDelete(da.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
