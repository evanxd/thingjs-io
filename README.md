# GPIO.JS
GPIO.JS is a node library helps developer control GPIO eaiser and faster.

## Sample Code
### Blink an LED
```
var GPIO = require('gpio-js');
var led = new GPIO(44, GPIO.OUTPUT);

setInterval(function() {
  led.val(1 - led.val());
}, 1000);
```

### Press a Button to Light On an LED.
The `data` event emitter is not implemented yet.
```
var GPIO = require('gpio-js');
var led = new GPIO(17, GPIO.OUTPUT);
var button = new GPIO(18, GPIO.INPUT);

button.on('data', function(value) {
  console.log('LED Pin: ' + led.val(value));
});
```
