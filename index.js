'use strict';

var exec = require('child_process').execSync;
var linkit7688 = require('iotjs-linkit7688');
var util = require('util');
var GPIO = require('./lib/gpio');
var PWM  = require('./lib/pwm'); 
var UART = require('./lib/uart');

function IO (io, type, options) {
  var IO;

  // Workaround: The UART `io` is an array, just use the first item `io[0]`.
  // Remap the `io` pin, from board's pin number to system's pin number.
  var pin = Array.isArray(io) ? linkit7688['p' + io[0]] : linkit7688['p' + io];
  io = typeof pin[type] === 'number' ? pin[type] : pin[type].index;

  // FIXME: Hard code the `mt7688_pinmux` command. We should use a cross-platform solution.
  // Use pinmux to switch the pin to the right mode.
  exec('mt7688_pinmux set ' + pin.group + ' ' + type);

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
