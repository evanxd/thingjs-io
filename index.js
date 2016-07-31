'use strict';

var util = require('util');
var GPIO = require('gpio-js');

function IO (pins, mode) {
  var instance;
  switch (mode) {
    case 'in':
    case 'out':
      instance = new GPIO(pins, mode);
  }
  return instance;
}

module.exports = IO;
