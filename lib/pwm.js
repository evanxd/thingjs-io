'use strict';

var fs = require('fs');

function PWM(pin, options) {
  options = options || {};
  this.pin = pin;
  this._period = options.period || 0;
  this._minDutyCycle = options.minDutyCycle || 0;
  this._maxDutyCycle = options.maxDutyCycle || 0;
  this._pinPath = PWM.PATH + 'pwm' + pin + '/';
  this._init();
}

PWM.PATH = '/sys/class/pwm/pwmchip0/';

PWM.prototype.pin = -1;
PWM.prototype._pinPath = null;
PWM.prototype._enable = 0;
PWM.prototype._period = 0;
PWM.prototype._dutyCycle = 0;
PWM.prototype._minDutyCycle = 0;
PWM.prototype._maxDutyCycle = 0;

PWM.prototype.val = function(value) {
  if (value >= 0 && value <= 1) {
    this._dutyCycle =
      Math.floor(this._minDutyCycle + (this._maxDutyCycle - this._minDutyCycle) * value);
    fs.writeFileSync(this._pinPath + 'duty_cycle', this._dutyCycle);
  } else if (value !== undefined) {
    console.warn('The value is invalid.');
  }
  return {
    enable: this._enable,
    period: this._period,
    dutyCycle: this._dutyCycle
  };
};

PWM.prototype.enable = function() {
  fs.writeFileSync(this._pinPath + 'enable', 1);
  this._enable = 1;
};

PWM.prototype.disable = function() {
  fs.writeFileSync(this._pinPath + 'enable', 0);
  this._enable = 0;
};

/**
 * Initialize the pin.
 */
PWM.prototype._init = function() {
  if (!fs.existsSync(this._pinPath)) {
    fs.writeFileSync(PWM.PATH + 'export', this.pin);
    this.enable();
    fs.writeFileSync(this._pinPath + 'period', this._period);
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
