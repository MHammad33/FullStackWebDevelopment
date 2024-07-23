const showMessage = (message, setMessage, duration = 3000) => {
  setMessage(message);
  setTimeout(() => {
    setMessage(null);
  }, duration);
};

export { showMessage };