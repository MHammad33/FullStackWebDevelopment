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
    <div>
      <button onClick={toggleVisibility}>{visible ? "Cancel" : props.buttonLabel}</button>
      {visible && props.children}
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Togglable;
