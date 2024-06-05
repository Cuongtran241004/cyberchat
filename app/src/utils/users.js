let userList = [
  {
    id: 1,
    username: "Trần Quốc Cường",
    room: "R01",
  },
  {
    id: 2,
    username: "Võ Thị Mai Hoa",
    room: "R02",
  },
];

const addUser = (newUser) => {
  userList = [...userList, newUser];
};

const removeUser = (id) => userList.filter((user) => user.id !== id);

const getUserList = (room) => {
  return userList.filter((user) => user.room === room);
};

const findUser = (id) => {
  return userList.find((user) => user.id === id);
};
module.exports = {
  getUserList,
  addUser,
  removeUser,
  findUser,
};
