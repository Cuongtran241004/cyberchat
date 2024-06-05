const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { createMessage } = require("../src/utils/create-message");
const {
  getUserList,
  addUser,
  removeUser,
  findUser,
} = require("../src/utils/users");

// Xây dựng static file
const publicPathDirectory = path.join(__dirname, "../public");
app.use(express.static(publicPathDirectory));

const server = http.createServer(app);
// để thư viện socketio biết sẽ tạo socketio với server nào

const io = socketio(server);
io.on("connection", (socket) => {
  // Tham gia vào 1 phòng cụ thể
  socket.on("Join room client to server", ({ room, username }) => {
    socket.join(room);

    // Chức năng welcome
    socket.emit(
      "Send msg server to client",
      createMessage(`Welcome to Cyberchat Room ${room}`, "Admin")
    );

    // Gửi tin nhắn cho các user còn lại
    socket.broadcast
      .to(room)
      .emit(
        "Send msg server to client",
        createMessage(`${username} is added`, "Admin")
      );

    // Chức năng chat
    socket.on("Send msg client to server", (msg, callback) => {
      const filter = new Filter();
      if (filter.isProfane(msg)) {
        return callback("Message is not valid!");
      }

      // sử dụng id để lấy username
      const id = socket.id;
      const user = findUser(id);

      // Chỉ những người cùng phòng mới nhận được tin nhắn
      io.to(room).emit(
        "Send msg server to client",
        createMessage(msg, user.username)
      );
      callback();
    });

    // chức năng  share location
    socket.on("Send location client to server", ({ latitude, longitude }) => {
      // sử dụng id để lấy username
      const id = socket.id;
      const user = findUser(id);

      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      io.to(room).emit(
        "Send location server to client",
        createMessage(url, user.username)
      );
    });

    // Xử lý user list
    const newUser = {
      id: socket.id,
      username,
      room,
    };
    addUser(newUser);
    io.to(room).emit("Send user list server to client", getUserList(room));

    // Ngắt kết nối
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.to(room).emit("Send user list server to client", getUserList(room));
      console.log("Client left server");
    });
  });
});
// var count = 0;
// const msg = "Hello everyone";
// // Lắng nghe sự kiện kết nối từ client
// // Mỗi khi người dùng kết nối thành công thì server cung cấp cho client một tham số là socket, socket này dùng để ngắt kết nối với socket.io và server
// io.on("connection", (socket) => {
//   console.log("New client connection!");
//   // nhận lại event từ client
//   socket.on("Send add client to server", () => {
//     count++;
//     // truyền event về cho client
//     io.emit("Send count server to client", count);
//   });

//   socket.on("Send sub client to server", () => {
//     count--;
//     // truyền event về cho client
//     io.emit("Send count server to client", count);
//   });

//   // truyền count từ server về client
//   socket.emit("Send count server to client", count);
//   socket.emit("Send msg server to client", msg);

//   // Ngắt kết nối
//   socket.on("disconnect", () => {
//     console.log("Client left server");
//   });
// });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App run on http://localhost:${port}`);
});
