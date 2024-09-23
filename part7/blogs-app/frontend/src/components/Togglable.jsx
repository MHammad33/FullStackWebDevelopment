import { Button, Collapse, Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useState, useImperativeHandle } from "react";

const Togglable = forwardRef(function Togglable(props, refs) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <Box>
      <Button variant="contained" onClick={toggleVisibility}>
        {visible ? "Cancel" : props.buttonLabel}
      </Button>
      <Collapse in={visible}>
        <Box mt={2}>{props.children}</Box>
      </Collapse>
    </Box>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Togglable;
