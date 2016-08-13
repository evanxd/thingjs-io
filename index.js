'use strict';

var util = require('util');
var GPIO = require('./lib/gpio');
var PWM  = require('./lib/pwm'); 
var UART = require('./lib/uart');

function IO (io, type, options) {
  var IO;
  switch (type) {
    case 'gpio':
      IO = new GPIO(io, options);
      break;
    case 'pwm':
      IO = new PWM(io, options);
      break;
    case 'uart':
      IO = new UART(io);
      break;
  }
  return IO;
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
