'use strict';

var fs = require('fs');

function PWM(pin) {
  this.pin = pin;
  this._initPin();
}

PWM.PATH = '/sys/class/pwm/pwmchip0/';
// Default period.
PWM.PERIOD = 19200000;

PWM.prototype.pin = -1;
PWM.prototype._enable = 0;
PWM.prototype._period = 0;
PWM.prototype._dutyCycle = 0;

PWM.prototype.val = function(dutyCycle, period) {
  var pwmPath = PWM.PATH + 'pwm' + this.pin + '/';
  if (period !== undefined) {
    fs.writeFileSync(pwmPath + 'period', period);
    this._period = period;
  }
  if (dutyCycle !== undefined) {
    fs.writeFileSync(pwmPath + 'duty_cycle', dutyCycle);
    this._dutyCycle = dutyCycle
  }
  return {
    enable: this._enable,
    period: this._dutyCycle,
    dutyCycle: this._period
  };
};

/**
 * Initialize the pin.
 */
PWM.prototype._initPin = function() {
  var pin = this.pin;
  var pwmPath = PWM.PATH + 'pwm' + pin + '/';
  if (!fs.existsSync(pwmPath)) {
    fs.writeFileSync(PWM.PATH + 'export', pin);
    fs.writeFileSync(pwmPath + 'enable', 1);
    // Set default period.
    fs.writeFileSync(pwmPath + 'period', PWM.PERIOD);
    this._period = PWM.PERIOD;
    this._enable = 1;
  } else {
    this._destroyPin();
    this._initPin();
  }
};

/**
 * Destroy the pin.
 *
 * @param {Number} pin Pin number.
 */
PWM.prototype._destroyPin = function() {
  fs.writeFileSync(PWM.PATH + 'unexport', this.pin);
  this._enable = 0;
};

module.exports = PWM;
