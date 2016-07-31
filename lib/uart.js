'use strict';

var util = require('util');
var serialport = require('serialport');
var EventEmitter = require('events').EventEmitter;
var SerialPort = serialport.SerialPort;

function UART (pin) {
  var that = this;
  var serialPort = new SerialPort('/dev/ttyS' + pin, {
    baudrate: 9600,
    parser: serialport.parsers.readline('\x42\x4d')
  }).on('open', function() {
    serialPort.on('data', function(data) {
      that.emit('data', data);
    });
  });
}

util.inherits(UART, EventEmitter);

module.exports = UART;
