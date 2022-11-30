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
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GROUP_HEADER } from "../constant/header";
import { getLocalStorage } from "../utils/localStorage";

export default function Groups() {
  // fakeData
  const data = [
    {
      _id: "1",
      name: "Ae bet thủ",
      owner: "hehe" // uerName
    },
    {
      _id: "2",
      name: "Ae bet thủ",
      owner: "hehe" // uerName
    },
    {
      _id: "3",
      name: "Ae bet thủ",
      owner: "hehe" // uerName
    },
    {
      _id: "4",
      name: "Ae bet thủ",
      owner: "hehe" // uerName
    },
    {
      _id: "5",
      name: "Ae bet thủ",
      owner: "hehe" // uerName
    },
    {
      _id: "6",
      name: "Ae bet thủ",
      owner: "hehe" // uerName
    },
    {
      _id: "7",
      name: "Ae bet thủ",
      owner: "hehe" // uerName
    }
  ];

  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (shouldRefetch) fetchGroup({});
  }, [shouldRefetch]);

  const navigate = useNavigate();

  const token = getLocalStorage("token");
  const user = getLocalStorage("user");
  const auth = !!token;

  const fetchGroup = async () => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .get("http://localhost:4000/group/list", { headers })
      .catch((error) => console.error("There was an error!", error));

    console.log(response.data?.groupList);
    if (response.status === 200) {
      setGroups(response.data?.groupList);
      setShouldRefetch(false);
    }
  };

  const handleCreateGroup = async () => {
    const headers = {
      "x-access-token": token
    };

    const data = {
      groupName
    };

    const response = await axios
      .post("http://localhost:4000/group/create", data, { headers })
      .catch((error) => console.error("There was an error!", error));

    if (response.status === 200) {
      setIsDialogOpen(false);
      setShouldRefetch(true);
    }

    console.log("groupName", groupName);
  };

  const handleChooseDetail = (id) => {
    navigate(`/groups/${id}`);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddUser = () => {
    setIsDialogOpen(true);
  };

  const handleChangeGroupName = (e) => {
    const { value } = e.target;
    setGroupName(e.target.value);
    console.log("value", value);
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
          <Typography
            variant="span"
            sx={{ fontWeight: "800", marginTop: "20px" }}
          >
            Choose a name for your group
          </Typography>
          <TextField onChange={handleChangeGroupName} />
          <Button
            sx={{ marginTop: "20px" }}
            onClick={handleCreateGroup}
            variant="outlined"
          >
            Create
          </Button>
        </Box>
      </Dialog>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="end"
        padding="10px"
        bgcolor="#f6f6f6"
        borderRadius="5px"
      >
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
      <Table>
        <TableHead>
          <TableRow>
            {GROUP_HEADER.map((header) => (
              <TableCell sx={{ fontWeight: "900" }}>{header.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((da) => (
            <TableRow onClick={() => handleChooseDetail(da._id)}>
              <TableCell>{da.groupName}</TableCell>
              <TableCell>{da.invitationString}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
