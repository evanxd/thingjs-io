'use strict';

var fs = require('fs-sync');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var GPIO_PATH = '/sys/class/gpio/';

function Pin(pin, mode) {
  EventEmitter.call(this);
  this.pin = pin;
  this.mode = mode;
}

util.inherits(Pin, EventEmitter);

Pin.prototype = {
  val: function(value) {
    if (this.mode === 'out') {
      write(this.pin, value);
    }
    return read(this.pin);
  }
};

/**
 * Read value of the pin.
 *
 * @param {Number} pin Pin number.
 */
function read(pin) {
  return fs.read(GPIO_PATH + 'gpio' + pin + '/value');
}

/**
 * Write value into the pin.
 *
 * @param {Number} pin Pin number.
 * @param {Number} value Pin status: 0 or 1.
 */
function write(pin, value) {
  fs.write(GPIO_PATH + 'gpio' + pin + '/value', value);
}

module.exports = Pin;
