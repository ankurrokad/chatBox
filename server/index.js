const express = require('express')
const socketIo = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000
const router = require('./Router')
const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', (socket) => {
    /** #1 While user joins */
    socket.on('join', ({ name, room }, cb) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) return cb(error)

        socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined ${user.room}` })
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) })

        cb()
    })

    /**#2  Sending Messages */
    socket.on('sendMessage', async (message, cb) => {
        const user = await getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit('roomData', { user: user.room, users: getUserInRoom(user.room) })
    })




    /** #X While user left */
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', { user: "admin", text: `${user.name} has left` })
        }
    })
})

app.use(router)

server.listen(PORT, () => console.log('Server is running'))
