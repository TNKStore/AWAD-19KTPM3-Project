/* eslint-disable react/forbid-prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { Box, Dialog, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

export default function ErrorView(props) {
  const { isErrorShow, handleCloseError, errorMessage } = props;

  return (
    <Dialog maxWidth="1000px" open={isErrorShow} onClose={handleCloseError}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="600px"
        height="100px"
      >
        <Typography variant="span" sx={{ fontWeight: "500" }}>
          {errorMessage}
        </Typography>
      </Box>
    </Dialog>
  );
}

ErrorView.propTypes = {
  isErrorShow: PropTypes.bool,
  handleCloseError: PropTypes.func,
  errorMessage: PropTypes.string
};

ErrorView.defaultProps = {
  isErrorShow: false,
  handleCloseError: () => {},
  errorMessage: null
};
