/* eslint-disable react/no-unstable-nested-components */
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
import { PropTypes } from "prop-types";
import axios from "axios";
import { GROUP_HEADER } from "../constant/header";
import { getLocalStorage } from "../utils/localStorage";
import ErrorView from "../components/errorView";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isErrorStringShow, setIsErrorStringShow] = useState(false);
  const [isErrorViewShow, setIsErrorViewShow] = useState(false);

  const navigate = useNavigate();

  const token = getLocalStorage("token");

  // API calls

  const fetchGroups = async () => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .get(`${process.env.REACT_APP_DOMAIN}/group/list`, { headers })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const createGroup = async () => {
    const headers = {
      "x-access-token": token
    };

    const data = {
      groupName
    };

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/group/create`, data, { headers })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const deleteGroup = async (id) => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .delete(`${process.env.REACT_APP_DOMAIN}/group/${id}`, { headers })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  // Handle functions

  const handleFetchGroups = async () => {
    const response = await fetchGroups();

    if (response.status === 200) {
      setGroups(response.data?.groupList);
      setShouldRefetch(false);
    }
  };

  const handleCreateGroup = async () => {
    const response = await createGroup();

    if (response?.status === 200) {
      setIsDialogOpen(false);
      setShouldRefetch(true);
    } else setIsErrorStringShow(true);
  };

  const handleDeleteGroup = async (id) => {
    const response = await deleteGroup(id);

    if (response?.status === 200) {
      setShouldRefetch(true);
    } else setIsErrorViewShow(true);
  };

  const handleChooseGroup = (id) => {
    navigate(`/groups/${id}`, { state: { groupID: id } });
  };

  const handleAddGroup = () => {
    setIsErrorStringShow(false);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChangeGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const handleCloseError = () => {
    setIsErrorViewShow(false);
  };

  // Use effect

  useEffect(() => {
    if (shouldRefetch) handleFetchGroups({});
  }, [shouldRefetch]);

  // Components

  function GroupMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { id } = props;

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <IconButton
          size="large"
          aria-haspopup="true"
          onClick={(e) => handleMenu(e, id)}
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
          <MenuItem onClick={() => handleDeleteGroup(id)}>Delete</MenuItem>
        </Menu>
      </>
    );
  }

  GroupMenu.propTypes = {
    id: PropTypes.string
  };

  GroupMenu.defaultProps = {
    id: null
  };

  return (
    <Box component="main">
      <ErrorView
        isErrorShow={isErrorViewShow}
        handleCloseError={handleCloseError}
        errorMessage="You do not have authorities to delete this group"
      />
      <Dialog maxWidth="100%" open={isDialogOpen} onClose={handleCloseDialog}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="1000px"
          height="300px"
        >
          <Typography
            variant="span"
            sx={{ fontWeight: "800", marginTop: "20px" }}
          >
            Choose a name for your group
          </Typography>
          <TextField
            sx={{ m: 1, width: "50ch" }}
            onChange={handleChangeGroupName}
          />
          <Button
            sx={{ marginTop: "20px" }}
            onClick={handleCreateGroup}
            variant="outlined"
          >
            Create
          </Button>
          {isErrorStringShow && (
            <Typography>
              <Typography
                variant="h8"
                component="div"
                color="red"
                align="center"
                sx={{ flexGrow: 1 }}
              >
                Something wrong happens, please try again later
              </Typography>
            </Typography>
          )}
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
          <Button onClick={handleAddGroup} variant="outlined">
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
            <TableRow>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => handleChooseGroup(da.id)}
              >
                {da.groupName}
              </TableCell>
              <TableCell>{da.users?.member?.role}</TableCell>
              <TableCell>
                {`${da.owner?.firstName} ${da.owner?.lastName}`}
              </TableCell>
              <TableCell sx={{ maxWidth: "10px" }}>
                <GroupMenu id={da.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
