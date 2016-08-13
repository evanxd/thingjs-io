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

IO.prototype = {
  /**
   * The interface to get/sett value of the io.
   * @param {Number} value The io's value.
   */
  val: function(value) {},
  /**
   * The interface to listen the io's value.
   * @param {String} eventName The name of the event.
   * @param {Function} listener The callback function.
   */
  on: function(eventName, listener) {}
}

module.exports = IO;
