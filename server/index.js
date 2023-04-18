import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import ip from 'ip'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

app.use(cors)

app.get('/', (req, res) => {
    res.send('<p>Open http://locahost:3000</p>')
})

io.on('connection', (socket) => {
    socket.on('select video', (msg) => {
        console.log(`Selecting Video - ${msg}`)

        io.emit('select video', msg)
    })

    socket.on('close video', () => {
        io.emit('close video')
    })

    socket.on('play', () => {
        console.log('VIDEO - PLAY')

        io.emit('play')
    })

    socket.on('pause', () => {
        console.log('VIDEO - PAUSE')

        io.emit('pause')
    })

    socket.on('seek', (msg) => {
        console.log('VIDEO - SEEKING', msg)
        io.emit('seek', msg)
    })

    // Socket Connection Closed
    socket.on('disconnect', () => {
        console.log('Connection Closed')
    })
})

server.listen(3001, () => {
    console.log('http://localhost:3001')
    console.log(`https://${ip.address()}:3001`)
})
