const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const socketio = require('socket.io')
const os = require('node-os-utils')
/*eslint-disable*/

//acceder a los recursos
const cpu = os.cpu
const memoria = os.mem

const server = express()

server.use(express.json())

server.use(cors())

server.use(morgan('dev'))

server.set('port', process.env.PORT || 3000)

const servidor = server.listen(server.get('port'),() => {
    console.log('La conexion fue exitosa!')
});

//le pasamos el servidor a socketio, para habilitar el canal web de socket
const io = socketio(servidor)

//establecemos la apertura del canal, para emitir posteriormente los datos
io.on('connection', (socket) => {

    setInterval(() => {
        cpu.usage().then((info) => {
            io.sockets.emit('uso_cpu', info)
            console.log(info)
        })

        cpu.free().then((info) => {
            io.sockets.emit('cpu_free', info)
            console.log(info)
        })

        memoria.free().then((totalMemMb) => {
            io.sockets.emit('memoria_free', totalMemMb.freeMemMb)
            console.log(totalMemMb)
        })

        memoria.used().then((usedMemMb) => {
            io.sockets.emit('memoria_utilizar', usedMemMb, ' MB')
            console.log(usedMemMb)
        })

        memoria.used().then((totalMemMb) => {
            io.sockets.emit('memoria_total', totalMemMb)
            console.log(totalMemMb)
        })

    },2000)

    socket.on('respuesta', (valor) => {
        console.log(valor)
    });

   


});