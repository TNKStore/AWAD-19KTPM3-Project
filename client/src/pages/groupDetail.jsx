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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { GROUP_DETAIL_HEADER, GROUP_HEADER } from "../constant/header";

export default function GroupDetail() {
  // fakeData
  const link = "https://hehe.com/2341324-134134-341324";
  const groupName = "Chodien";
  const data = [
    {
      _id: "1",
      email: "Ae bet thủ@gmail.com",
      role: "admin"
    },
    {
      _id: "2",
      email: "Khue@gmail.com",
      role: "user"
    },
    {
      _id: "3",
      email: "Khue@gmail.com",
      role: "user"
    },
    {
      _id: "3",
      email: "Khue@gmail.com",
      role: "user"
    }
  ];
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleChooseDetail = (id) => {
    navigate(`/groups/${id}`);
  };

  const handleDelete = (_id) => {};

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddUser = () => {
    setIsDialogOpen(true);
  };

  const handleChangeInviteEmail = (e) => {
    const { value } = e.target;
    setInviteEmail(e.target.value);
    console.log("value", value);
  };

  const handleInviteUser = () => {
    console.log("inviteEmail", inviteEmail);
  };

  return (
    <Box component="main">
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="500px"
          height="300px"
        >
          <Typography>
            <Typography variant="span" sx={{ fontWeight: "800" }}>
              {`Invite link: `}
            </Typography>
            {link}
          </Typography>

          <Typography
            variant="span"
            sx={{ fontWeight: "800", marginTop: "20px" }}
          >
            Email
          </Typography>
          <TextField onChange={handleChangeInviteEmail} />
          <Button
            sx={{ marginTop: "20px" }}
            onClick={handleInviteUser}
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
            {data.map((da) => (
              <TableRow onClick={() => handleChooseDetail(da._id)}>
                <TableCell>{da.email}</TableCell>
                <TableCell>{da.role}</TableCell>
                <TableCell sx={{ maxWidth: "10px" }}>
                  <Button onClick={() => handleDelete(_id)}>
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
