const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const ejs = require('ejs');
const path = require('path');
const { Socket } = require('net');
const app = express();
const myserver = createServer(app);
const io = new Server(myserver);

app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'))

app.get('/', (req, res) => {
    return res.render("index");
})


io.on("connection", (socket) =>{
    console.log("connected", socket.id);
    socket.on("send-location", (data)=>{
        io.emit("received", {id:socket.id, ...data});
    })

    socket.on('disconnect',()=>{
        io.emit("user_disconnected", socket.id);
    })
})

myserver.listen(8000, () => {
    console.log("Server is live");
})