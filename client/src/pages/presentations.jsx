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
import DeleteIcon from "@mui/icons-material/Delete";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GROUP_HEADER } from "../constant/header";
import { getLocalStorage } from "../utils/localStorage";

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState([]);
  const [presentationName, setPresentationName] = useState("");
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const token = getLocalStorage("token");

  // API calls

  const fetchPresentations = async () => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .get(`${process.env.REACT_APP_DOMAIN}/group/list`, { headers })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const createPresentation = async () => {
    const headers = {
      "x-access-token": token
    };

    const data = {
      presentationName
    };

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/group/create`, data, { headers })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  // Handle functions

  const handleFetchPresentations = async () => {
    const response = await fetchPresentations();

    if (response.status === 200) {
      setPresentations(response.data?.groupList);
      setShouldRefetch(false);
    }
  };

  const handleCreatePresentation = async () => {
    const response = await createPresentation();

    if (response.status === 200) {
      setIsDialogOpen(false);
      setShouldRefetch(true);
    }
  };

  const handleChoosePresentation = (id) => {
    navigate(`/groups/${id}`, { state: { groupID: id } });
  };

  const handleAddPresentation = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChangePresentationName = (e) => {
    setPresentationName(e.target.value);
  };

  const handleDeletePresentation = () => {
    console.log();
  };

  // Use effect

  useEffect(() => {
    if (shouldRefetch) handleFetchPresentations({});
  }, [shouldRefetch]);

  return (
    <Box component="main">
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
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
          <TextField onChange={handleChangePresentationName} />
          <Button
            sx={{ marginTop: "20px" }}
            onClick={handleCreatePresentation}
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
          <Button onClick={handleAddPresentation} variant="outlined">
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
          {presentations.map((da) => (
            <TableRow onClick={() => handleChoosePresentation(da.id)}>
              <TableCell>{da.groupName}</TableCell>
              <TableCell>{da.users?.member?.role}</TableCell>
              <TableCell>
                {`${da.owner?.firstName} ${da.owner?.lastName}`}
              </TableCell>
              <TableCell sx={{ maxWidth: "10px" }}>
                <Button onClick={() => handleDeletePresentation(da.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
