# GPIO.JS
GPIO.JS is a node library helps developer control GPIO eaiser and faster.

## Sample Code
### Blink an LED
```
var gpio = require('gpio-js');
var led = new gpio.Pin(44, gpio.OUTPUT);

setInterval(function() {
  led.val(1 - led.val());
}, 1000);
```

### Press a Button to Light On an LED.
The `data` event emitter is not implemented yet.
```
var gpio = require('gpio-js');
var led = new gpio.Pin(gpio.rpi.PIN17, gpio.OUTPUT);
var button = new gpio.Pin(gpio.rpi.PIN18, gpio.INPUT);

button.on('data', function(value) {
  console.log('LED Pin: ' + led.val(value));
});
```
