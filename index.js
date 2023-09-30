// FS

const fs = require("fs")

// Express

const express = require("express")
const app = express()

// Http

const http = require("http")
const server = http.createServer(app)

// Socket.io

const io = require("socket.io")(server, {
    cors: { origin: "*" }
})

io.on("connection", (socket) => {
    socket.on("message", (data) => {
        if (data[0].length <= 30 && data[1].length <= 256) {
            socket.broadcast.emit("message", (data))
            fs.appendFile("messages.txt", `${data[0]}: ${data[1]}\n`, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
    })

    fs.readFile("messages.txt", "utf8", function(err, data) {
        io.emit("messages", data)
    })
})

app.get("/", (req, res) => {
    res.send("service available")
})

server.listen(3000, () => {
    console.log("server online")
})
