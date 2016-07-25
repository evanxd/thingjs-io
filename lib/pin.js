'use strict';

var fs = require('fs');
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
    var mode = this.mode;
    var pin = this.pin;
    if (mode === 'in') {
      value = readPin(pin);
    } else if (mode === 'out') {
      writePin(pin, value);
    } else {
      console.warn('No such mode: ' + mode);
    }
    return value;
  }
};

/**
 * Export pin for reading/writing the pin.
 *
 * @param {Number} pin Pin number.
 */
function exportPin(pin) {
  if (!fs.existsSync(GPIO_PATH + 'gpio' + pin)) {
    fs.writeFileSync(GPIO_PATH + 'export', pin);
  } else {
    unexportPin(pin);
    exportPin(pin);
  }
}

/**
 * Reset the pin.
 *
 * @param {Number} pin Pin number.
 */
function unexportPin(pin) {
  fs.writeFileSync(GPIO_PATH + 'unexport', pin);
}

/**
 * Read value of the pin.
 *
 * @param {Number} pin Pin number.
 */
function readPin(pin) {
  return fs.readFileSync(GPIO_PATH + 'gpio' + pin + '/value', { encoding: 'utf-8' });
}

/**
 * Write value into the pin.
 *
 * @param {Number} pin Pin number.
 * @param {Number} value Pin status: 0 or 1.
 */
function writePin(pin, value) {
  fs.writeFileSync(GPIO_PATH + 'gpio' + pin + '/value', value);
}

module.exports = Pin;
