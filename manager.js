let socket = io("ws://api.v1.global.123game.dev")

let u = ""
let o = false

let usernameInputFeild = document.getElementById("nameInput")
let usernameSubmit = document.getElementById("nameSubmit")

usernameSubmit.addEventListener("click", () => {
    if (usernameInputFeild.value === "") {
        document.getElementById("nameWarning").style.display = "block"
    } else {
        document.getElementById("nameWarning").style.display = "none"
        document.getElementById("userContainer").style.display = "none"
        document.getElementById("chatContainer").style.display = "flex"
        u = usernameInputFeild.value
    }
})

function loadMessage(name, text) {
    let p = document.createElement("p")
    p.innerText = `${name}: ${text}`
    document.getElementById("chatMessages").appendChild(p)
    document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight
}

function sendMessage() {
    if (document.getElementById("messageInput").value.length > 0 && u != "") {
        loadMessage(u, document.getElementById("messageInput").value)
        socket.emit("message", ([u, document.getElementById("messageInput").value]))
        document.getElementById("messageInput").value = ""
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage()
    }
})

socket.on("message", (data) => {
    loadMessage(data[0], data[1])
})

socket.on("messages", (data) => {
    if (o === true) {
        o = true
        let split = data.split("\n")

        for (let i = 0; i < split.length; i++) {
            let p = document.createElement("p")
            p.innerText = split[i]
            document.getElementById("chatMessages").appendChild(p)
            document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight
        }
        console.log(data)
    }
})

// s = socket
// u = username
// f = usernameInputFeild
// m = usernameSubmit
// l = loadMessage()
// a = sendMessage()
// d = data
// o = loaded
