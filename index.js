'use strict';

var util = require('util');
var GPIO = require('gpio-js');
var UART = require('./lib/uart');

function IO (pins, mode) {
  var instance;
  switch (mode) {
    case 'in':
    case 'out':
      instance = new GPIO(pins, mode);
      break;
    case 'uart':
      instance = new UART(pins);
      break;
  }
  return instance;
}

module.exports = IO;
