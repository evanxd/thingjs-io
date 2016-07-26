'use strict';

var exec = require('child_process').execSync;
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// XXX: Workaround to set the wled's pin mode as GPIO for Linkit 7688.
exec('mt7688_pinmux set wled gpio');

function GPIO(pin, mode) {
  EventEmitter.call(this);
  this.pin = pin;
  if (mode === GPIO.INPUT || mode === GPIO.OUTPUT) {
    this.mode = mode;
  } else {
    console.warn('No such mode: ' + mode);
  }
  exportPin(pin);
}

util.inherits(GPIO, EventEmitter);

GPIO.GPIO_PATH = '/sys/class/gpio/';
GPIO.INPUT = 'input';
GPIO.OUTPUT = 'output';

GPIO.prototype = {
  pin: null,
  mode: null,
  _value: null,

  val: function(value) {
    var mode = this.mode;
    var pin = this.pin;
    if (mode === GPIO.INPUT) {
      this._value = readPin(pin);
    } else if (mode === GPIO.OUTPUT && value !== undefined) {
      writePin(pin, value);
      this._value = value;
    }
    return this._value;
  }
};

/**
 * Export pin for reading/writing the pin.
 *
 * @param {Number} pin Pin number.
 */
function exportPin(pin) {
  if (!fs.existsSync(GPIO.GPIO_PATH + 'gpio' + pin)) {
    fs.writeFileSync(GPIO.GPIO_PATH + 'export', pin);
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
  fs.writeFileSync(GPIO.GPIO_PATH + 'unexport', pin);
}

/**
 * Read value of the pin.
 *
 * @param {Number} pin Pin number.
 */
function readPin(pin) {
  return fs.readFileSync(GPIO.GPIO_PATH + 'gpio' + pin + '/value', { encoding: 'utf-8' });
}

/**
 * Write value into the pin.
 *
 * @param {Number} pin Pin number.
 * @param {Number} value Pin status: 0 or 1.
 */
function writePin(pin, value) {
  fs.writeFileSync(GPIO.GPIO_PATH + 'gpio' + pin + '/value', value);
}

module.exports = GPIO;
