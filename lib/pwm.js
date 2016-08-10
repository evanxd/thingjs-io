'use strict';

var fs = require('fs');

function PWM(pin) {
  this.pin = pin;
  this._init();
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

PWM.prototype.enable = function() {
  fs.writeFileSync(PWM.PATH + 'pwm' + this.pin + '/enable', 1);
  this._enable = 1;
};

PWM.prototype.disable = function() {
  fs.writeFileSync(PWM.PATH + 'pwm' + this.pin + '/enable', 0);
  this._enable = 0;
};

/**
 * Initialize the pin.
 */
PWM.prototype._init = function() {
  var pin = this.pin;
  var pwmPath = PWM.PATH + 'pwm' + pin + '/';
  if (!fs.existsSync(pwmPath)) {
    fs.writeFileSync(PWM.PATH + 'export', pin);
    this.enable();
    // Set default period.
    fs.writeFileSync(pwmPath + 'period', PWM.PERIOD);
    this._period = PWM.PERIOD;
    this._enable = 1;
  } else {
    this._destroy();
    this._init();
  }
};

/**
 * Destroy the pin.
 *
 * @param {Number} pin Pin number.
 */
PWM.prototype._destroy = function() {
  fs.writeFileSync(PWM.PATH + 'unexport', this.pin);
  this._enable = 0;
};

module.exports = PWM;
