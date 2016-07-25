'use strict';

var fs = require('fs-sync');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var GPIO_PATH = '/sys/class/gpio/';

function Pin(pin, mode) {
  EventEmitter.call(this);
  this.pin = pin;
  this.mode = mode;
  exportPin(pin);
}

util.inherits(Pin, EventEmitter);

Pin.prototype = {
  val: function(value) {
    if (this.mode === 'out') {
      writePin(this.pin, value);
    }
    return readPin(this.pin);
  }
};

/**
 * Export pin for reading/writing the pin.
 *
 * @param {Number} pin Pin number.
 */
function exportPin(pin) {
  if (!fs.exists(GPIO_PATH + 'gpio' + pin)) {
    fs.write(GPIO_PATH + 'export', pin);
  }
}

/**
 * Read value of the pin.
 *
 * @param {Number} pin Pin number.
 */
function readPin(pin) {
  return fs.read(GPIO_PATH + 'gpio' + pin + '/value');
}

/**
 * Write value into the pin.
 *
 * @param {Number} pin Pin number.
 * @param {Number} value Pin status: 0 or 1.
 */
function writePin(pin, value) {
  fs.write(GPIO_PATH + 'gpio' + pin + '/value', value);
}

module.exports = Pin;
