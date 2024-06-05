const socket = io();
document.getElementById("form-msg").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("input-msg").value;
  const acknowledgements = (error) => {
    if (error) {
      return alert("Message is not valid!");
    }
    console.log("Message is sent successfully!");
  };

  // Gửi msg lên server
  socket.emit("Send msg client to server", msg, acknowledgements);
});

socket.on("Send msg server to client", (masg) => {
  // Hiển thị lên màn hình
  const { msg, username, createAt } = masg;
  let contentHtml = document.getElementById("class__messages").innerHTML;
  contentHtml += ` <div class="message-item">
<div class="message__row1">
    <p class="message__name">${username}</p>
    <p class="message__date">${createAt}</p>
</div>
<div class="message__row2">
    <p class="message__content">
        ${msg}
    </p>
</div>
</div>`;
  document.getElementById("class__messages").innerHTML = contentHtml;

  // Xóa nội dung được nhập trong input
  document.getElementById("input-msg").value = "";
});

// Share location
document.getElementById("btn-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Not support for this function!");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    const { latitude, longitude } = position.coords;
    socket.emit("Send location client to server", { latitude, longitude });
  });
});

socket.on("Send location server to client", (data) => {
  const { msg, username, createAt } = data;
  let contentHtml = document.getElementById("class__messages").innerHTML;
  contentHtml += ` <div class="message-item">
<div class="message__row1">
    <p class="message__name">${username}</p>
    <p class="message__date">${createAt}</p>
</div>
<div class="message__row2">
    <p class="message__content">
        <a href="${msg}" target="_blank">Google map</a>
    </p>
</div>
</div>`;
  document.getElementById("class__messages").innerHTML = contentHtml;
});

// Xử lý query string
const querystring = location.search;
const params = Qs.parse(querystring, {
  ignoreQueryPrefix: true, // loại bỏ đi dấu chấm hỏi
});
const { room, username } = params;

// Gửi event lên server
socket.emit("Join room client to server", { room, username });

// Hiển thị tên phòng
document.getElementById("app__title").innerHTML = `Room ${room}`;

// Xử lý user list
socket.on("Send user list server to client", (list) => {
  let contentHtml = "";
  list.map((user) => {
    contentHtml += `<li class="app__item-user">${user.username}</li>`;
  });
  document.getElementById("app__list-user--content").innerHTML = contentHtml;
});
