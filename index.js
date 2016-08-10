'use strict';

var util = require('util');
var GPIO = require('./lib/gpio');
var PWM  = require('./lib/pwm'); 
var UART = require('./lib/uart');

function IO (pin, mode) {
  var io;
  switch (mode) {
    case 'in':
    case 'out':
      io = new GPIO(pin, mode);
      break;
    case 'pwm':
      io = new PWM(pin);
      break;
    case 'uart':
      io = new UART(pin);
      break;
  }
  return io;
}

module.exports = IO;
