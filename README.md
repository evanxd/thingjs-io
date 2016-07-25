# GPIO.JS
GPIO.JS is a node library helps developer control GPIO eaiser and faster.

## Sample Code
### Blink an LED
```
var Pin = require('gpio-js').Pin;
var led = new gpio.Pin(44, Pin.OUTPUT);

setInterval(function() {
  led.val(1 - led.val());
}, 1000);
```

### Press a Button to Light On an LED.
The `data` event emitter is not implemented yet.
```
var Pin = require('gpio-js').Pin;
var led = new gpio.Pin(17, Pin.OUTPUT);
var button = new gpio.Pin(18, Pin.INPUT);

button.on('data', function(value) {
  console.log('LED Pin: ' + led.val(value));
});
```
