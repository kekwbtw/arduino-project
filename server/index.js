
//checking correct usage of application  =>  node application.js <COM#>
if (process.argv[2] == undefined){
  global.console.log("Usage: node application.js <COM#>");
  process.exit(1);
}
let portCom = process.argv[2];
// end checking correct usage for arduino COM

// express module
const express = require('express');
const app = express();

// http module
const http = require('http');
const server = http.createServer(app);

/*
-----before-----

const SocketIO = require('socket.io'); --change
const io = SocketIO.listen(server);

*/
const { Server } = require("socket.io");
const io = new Server(server);

// dotenv module
require('dotenv').config();
const PORT = process.env.PORT;

// server deployment
app.use(express.static(__dirname + '/public'));
server.listen(PORT, () => {
  console.log(`Server running on port : http://localhost:${PORT}`);
});

/*
-----before-----

const SerialPort = require('serialport');

const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort(portCom, {
  baudRate: 115200
});

const parser = port.pipe(new ReadLine({ delimiter: '\r\n' })); 

parser.on('open', function () {
  console.log('connection is opened');
}); 

*/

// serialport module
const { SerialPort } = require('serialport');

const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({ path: portCom, baudRate: 115200 });

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

//parser.on('data', console.log);

// print values in console
parser.on('data', (data) => {
  console.log(data);
  io.emit('arduinoMessage', data.toString());
});

// print errors
parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));
