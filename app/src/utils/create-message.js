const formatTime = require("date-format");

const createMessage = (msg, username) => {
  return {
    msg,
    username,
    createAt: formatTime("dd/MM/yyyy - hh:mm:ss", new Date()),
  };
};

module.exports = {
  createMessage,
};
