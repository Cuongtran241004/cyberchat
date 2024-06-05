# Khởi tạo dự án

`npm init`
`npm i express`
`npm i nodemon --save-dev`
Khởi tạo 2 folder: app chứa public và src

Cài đặt Socket.io: `npm i socket.io`
Tham khảo:

- [Socket.io-npm](https://www.npmjs.com/package/socket.io)
- [Socket.io](https://socket.io/docs/v4/tutorial/introduction)

# Khởi tạo server bằng http-express

![Before](image.png)
![After](image-1.png)

![Connect Socketio](image-2.png)
![Connection](image-7.png)

Ớ phía client
![client](image-3.png)
Khi client gọi `io();` thì nó đã gửi một event đến server với tên là "connection"

Ở phía server
![server](image-4.png)

![Disconnection](image-6.png)

![WebSocket](image-8.png)
![Socket & IO](image-9.png)
Cơ chế ổ điện: Khi client C gửi event lên server
![socket Emit](image-11.png)

- Nếu dùng socket: server chỉ trả về dữ liệu cho client C
- Nếu dùng io: server trả về dữ liệu cho tất cả các client

![IO Emit](image-10.png)
![IO emit](image-12.png)
![Summary](image-13.png)

# Thực hành

![UI](image-14.png)

![Bad words](image-15.png)

![Event Acknowledgements](image-16.png)

## Xử lý Bad-words

Cài đặt: `npm i bad-words`
Tham khảo" [link](https://www.npmjs.com/package/bad-words)
![Bad-words](image-17.png)

## Chức năng Welcome

![Welcome](image-18.png)
![Broadcasting](image-19.png)

## Chức năng Share Location

![Share location](image-20.png)

## Xử lý thời gian gửi tin nhắn

Cài đặt: `npm i date-format`
Tham khảo: [link](https://www.npmjs.com/package/date-format)
Sử dụng:

```
const formatTime = require("data-format");
formatTime("dd/MM/yyyy - hh:mm:ss", new Date());

```

![Page room](image-21.png)

## Xử lý params từ form input

![Url params](image-22.png)
Tham khảo: [link](https://cdnjs.com/libraries/qs)
Nhúng link cdn vào file chat.html để lấy được tham số

![Join](image-23.png)
![to room](image-24.png)
![crud](image-25.png)
![delete](image-26.png)
