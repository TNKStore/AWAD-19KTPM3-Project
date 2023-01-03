/* eslint-disable react/forbid-prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import {
  Box,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { PropTypes } from "prop-types";
import { RESULT_LIST_HEADER } from "../constant/header";

export default function ResultList(props) {
  const { isDialogOpen, handleCloseResult, history, slideID } = props;

  const slideHistory = [];
  history.forEach((item) => {
    if (item.slideId === slideID) slideHistory.push(item);
  });

  return (
    <Dialog maxWidth="1000px" open={isDialogOpen} onClose={handleCloseResult}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="centerTop"
        flexDirection="column"
        width="1360px"
        height="800px"
      >
        <Table>
          <TableHead>
            <TableRow>
              {RESULT_LIST_HEADER.map((header) => (
                <TableCell sx={{ fontWeight: "900" }}>{header.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {slideHistory.map((da) => (
              <TableRow
                onClick={() => {
                  console.log(da.id);
                }}
              >
                <TableCell>{da.email}</TableCell>
                <TableCell>{`${da.firstName} ${da.lastName}`}</TableCell>
                <TableCell>{da.option}</TableCell>
                <TableCell>{new Date(da.createdAt).toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Dialog>
  );
}

ResultList.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseResult: PropTypes.func,
  history: PropTypes.array,
  slideID: PropTypes.number
};

ResultList.defaultProps = {
  isDialogOpen: false,
  handleCloseResult: () => {},
  history: [],
  slideID: null
};
