# GPIO.JS
GPIO.JS is a node library helps developer control GPIO eaiser and faster.

## Sample Code
Press a button to light on a LED.
```
var gpio = require('gpio-js');
var led = new gpio.Pin(gpio.PIN17, gpio.OUTPUT);
var button = new gpio.Pin(gpio.PIN18, gpio.INPUT);

button.on('data', function(value) {
  led.val(value);
  console.log('LED Pin: ' + led.val());
});
```
