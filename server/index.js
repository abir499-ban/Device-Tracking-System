const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
const myserver = createServer(app);
const io = new Server(myserver,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET", "POST"]
    }
});

app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173',
}))


app.get('/', (req, res) => {
    return res.end("hi");
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