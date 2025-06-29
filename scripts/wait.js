#!/usr/bin/env node
const [host, port, ...cmd] = process.argv.slice(2)
const net = require('net')
const { spawn } = require('child_process')
function wait() {
  const socket = net.connect(port, host)
  socket.once('connect', () => {
    socket.end()
    spawn(cmd[0], cmd.slice(1), { stdio: 'inherit' })
  })
  socket.once('error', () => setTimeout(wait, 1000))
}
wait()
