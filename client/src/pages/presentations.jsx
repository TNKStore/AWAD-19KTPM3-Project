import {
  Box,
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PRESENTATION_HEADER } from "../constant/header";
import { getLocalStorage } from "../utils/localStorage";

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState([]);
  const [presentationName, setPresentationName] = useState("");
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const token = getLocalStorage("token");

  // API calls

  const fetchPresentations = async () => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .get(`${process.env.REACT_APP_DOMAIN}/presentation/list`, { headers })
      .catch((error) => console.error("There was an error!", error));

    console.log(response);
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
      .post(`${process.env.REACT_APP_DOMAIN}/presentation/create`, data, {
        headers
      })
      .catch((error) => console.error("There was an error!", error));

    console.log(response);
    return response;
  };

  const deletePresentation = async (id) => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .delete(`${process.env.REACT_APP_DOMAIN}/presentation/${id}`, {
        headers
      })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  // Handle functions

  const handleFetchPresentations = async () => {
    const response = await fetchPresentations();

    if (response.status === 200) {
      setPresentations(response.data?.presentationList);
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

  const handleDeletePresentation = async (id) => {
    const response = await deletePresentation(id);

    if (response.status === 200) {
      setShouldRefetch(true);
    }
  };

  const handleChoosePresentation = (id) => {
    navigate(`/presentations/edit/${id}`, { state: { presentationID: id } });
    // navigate(`/presentations/view?id=${id}`);
  };

  const handleManageCollaborators = (id) => {
    navigate(`/presentations/collaborators/${id}`, {
      state: { presentationID: id }
    });
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            Choose a name for your presentation
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
            {PRESENTATION_HEADER.map((header) => (
              <TableCell sx={{ fontWeight: "900" }}>{header.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {presentations.map((da) => (
            <TableRow>
              <TableCell onClick={() => handleChoosePresentation(da.id)}>
                {da.presentationName}
              </TableCell>
              <TableCell>{new Date(da.updatedAt).toString()}</TableCell>
              <TableCell sx={{ maxWidth: "10px" }}>
                <IconButton
                  size="large"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleManageCollaborators(da.id)}>
                    Manage Collaborators
                  </MenuItem>
                  <MenuItem onClick={() => handleDeletePresentation(da.id)}>
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
