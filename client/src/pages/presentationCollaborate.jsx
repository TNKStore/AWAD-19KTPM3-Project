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
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PropTypes } from "prop-types";
import axios from "axios";
import { PRESENTATION_COLLABORATOR_HEADER } from "../constant/header";
import { getLocalStorage } from "../utils/localStorage";
import ErrorView from "../components/errorView";

export default function PresentationCollaboratePage() {
  const [presentationID, setPresentationID] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [presentationCode, setPresentationCode] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isErrorStringShow, setIsErrorStringShow] = useState(false);
  const [isErrorViewShow, setIsErrorViewShow] = useState(false);

  const location = useLocation();

  const token = getLocalStorage("token");

  // API calls

  const fetchCollaborators = async () => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .get(
        `${process.env.REACT_APP_DOMAIN}/presentation/${presentationID}/collaborator`,
        {
          headers
        }
      )
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const sendInvitationEmail = async () => {
    const headers = {
      "x-access-token": token
    };

    const data = {
      presentationId: presentationID,
      email: inviteEmail
    };

    const response = await axios
      .post(
        `${process.env.REACT_APP_DOMAIN}/presentation/add-collaborator`,
        data,
        {
          headers
        }
      )
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const deleteCollaborator = async (id) => {
    const headers = {
      "x-access-token": token
    };

    const data = {
      presentationId: presentationID,
      collaboratorId: id
    };

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/collaborator/remove`, data, {
        headers
      })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  // Handle functions

  const handleFetchCollaborators = async () => {
    const response = await fetchCollaborators();

    if (response.status === 200) {
      const resData = response.data.presentation;
      setCollaborators(resData.users);
      setPresentationCode(resData.code);
      setShouldRefetch(false);
    }
  };

  const handleSendInvitationEmail = async () => {
    const response = await sendInvitationEmail();

    if (response?.status === 200) {
      setIsDialogOpen(false);
      setShouldRefetch(true);
    } else setIsErrorStringShow(true);
  };

  const handleDeleteCollaborator = async (id) => {
    const response = await deleteCollaborator(id);

    if (response?.status === 200) {
      setShouldRefetch(true);
    } else setIsErrorViewShow(true);
  };

  const handleChooseDetail = (id) => {
    console.log(id);
  };

  const handleAddMember = () => {
    setIsErrorStringShow(false);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChangeInviteEmail = (e) => {
    setInviteEmail(e.target.value);
  };

  const handleCloseError = () => {
    setIsErrorViewShow(false);
  };

  // Use effect

  useEffect(() => {
    if (location.state !== null) {
      setPresentationID(location.state.presentationID);
    }
  }, [presentationID]);

  useEffect(() => {
    if (presentationID !== null && shouldRefetch) {
      handleFetchCollaborators({});
    }
  }, [presentationID, shouldRefetch]);

  // Components

  function PresentationCollaborateMenu(props) {
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
          <MenuItem onClick={() => handleDeleteCollaborator(id)}>
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  }

  PresentationCollaborateMenu.propTypes = {
    id: PropTypes.string
  };

  PresentationCollaborateMenu.defaultProps = {
    id: null
  };

  return (
    <Box component="main">
      <ErrorView
        isErrorShow={isErrorViewShow}
        handleCloseError={handleCloseError}
        errorMessage="You do not have authorities to do this action"
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
            Enter Collaborator email
          </Typography>
          <TextField
            sx={{ m: 1, width: "50ch" }}
            onChange={handleChangeInviteEmail}
          />
          <Button
            sx={{ marginTop: "20px" }}
            onClick={handleSendInvitationEmail}
            variant="outlined"
          >
            Send
          </Button>
          {isErrorStringShow && (
            <Typography>
              <Typography
                variant="span"
                component="div"
                color="red"
                align="center"
                sx={{ flexGrow: 1 }}
              >
                User not found
              </Typography>
            </Typography>
          )}
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
              {`Presentation Code: `}
            </Typography>
            {presentationCode}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin="0 15px 0 0"
        >
          <Button onClick={handleAddMember} variant="outlined">
            <AddToPhotosIcon />
          </Button>
        </Box>
      </Box>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              {PRESENTATION_COLLABORATOR_HEADER.map((header) => (
                <TableCell sx={{ fontWeight: "900" }}>{header.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {collaborators.map((da) => (
              <TableRow onClick={() => handleChooseDetail(da.id)}>
                <TableCell>
                  {`${da.firstName} ${da.lastName}`}
                  <div className="italic">{da.email}</div>
                </TableCell>
                <TableCell>{da.collaborator?.role}</TableCell>
                <TableCell sx={{ maxWidth: "10px" }}>
                  <PresentationCollaborateMenu id={da.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
