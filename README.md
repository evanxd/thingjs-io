# sync-gpio
sync-gpio is a node library helps developer control GPIO pins on Raspberry Pi eaiser and faster.

## Sample Code
```
var gpio = require('sync-gpio');
var led = new gpio.Pin(gpio.PIN17, gpio.OUTPUT);
var button = new gpio.Pin(gpio.PIN18, gpio.INPUT);

button.on('data', function(value) {
  led.val(value);
  console.log('LED Pin: ' + led.val());
});
```
