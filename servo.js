var stepper = {};

var keypress = require('keypress');
var sleep = require('sleep');
var GPIO = require('onoff').Gpio,
	A = new GPIO(6, 'out'), //motor stepper
	B = new GPIO(13, 'out'),
	C = new GPIO(19, 'out'),
	D = new GPIO(26, 'out'),
	motor_up = new GPIO(23, 'out'), //motor DC +/-
	motor_down = new GPIO(24, 'out'), //motor DC -/+
	enable_1 = new GPIO(25, 'out'), //L293DNE

	servo = new GPIO(14, 'out'),
	switch_1 = new GPIO(7, 'out'),
	switch_2 = new GPIO(1, 'out'),

	light_front_left = new GPIO(18, 'out'),
	light_front_right = new GPIO(11, 'out'),
	light_rear_left = new GPIO(16, 'out'),
	light_rear_right = new GPIO(20, 'out'),
	light_middle_1 = new GPIO(12, 'out'),
	light_middle_2 = new GPIO(21, 'out'),
	iv;

enable_1.writeSync(1);


keypress(process.stdin);
process.stdin.on('keypress', function(ch, key) {
	try {
		switch (key.name) {
			case "b":
				servo.writeSync(1);
				sleep.sleep(1);
				servo.writeSync(0);
				break;
			case "n":
				servo.writeSync(0);
				break;
			case "j":
				console.log('switch_1 on')
				switch_1.writeSync(1);
				break;
			case "h":
				console.log('switch_2 on')
				switch_2.writeSync(1);
				break;
			case "space":
				console.log('switch_1 off')
				console.log('switch_2 off')			
				switch_1.writeSync(0);
				switch_2.writeSync(0);
				break;
		}

	} catch (error) {
		throw error;
	}

	if (key && key.ctrl && key.name == 'c') {
		process.stdin.pause();
	}
});
process.stdin.setRawMode(true);
process.stdin.resume();
