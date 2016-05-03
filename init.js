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
	switch_1 = new GPIO(7, 'out'),
	switch_2 = new GPIO(1, 'out'),
	light_front_left = new GPIO(18, 'out'),
	light_front_right = new GPIO(11, 'out'),
	light_rear_left = new GPIO(16, 'out'),
	light_rear_right = new GPIO(20, 'out'),
	light_middle_1 = new GPIO(12, 'out'),
	light_middle_2 = new GPIO(21, 'out'),
	iv;


console.log("All modules was loaded!")

enable_1.writeSync(1);

var step = [
	{ A: 1, B: 0, C: 0, D: 0 },
	{ A: 1, B: 1, C: 0, D: 0 },
	{ A: 0, B: 1, C: 0, D: 0 },
	{ A: 0, B: 1, C: 1, D: 0 },
	{ A: 0, B: 0, C: 1, D: 0 },
	{ A: 0, B: 0, C: 1, D: 1 },
	{ A: 0, B: 0, C: 0, D: 1 },
	{ A: 1, B: 0, C: 0, D: 1 }
]

var step2 = [
	{ A: 1, B: 0, C: 0, D: 1 },
	{ A: 0, B: 0, C: 0, D: 1 },
	{ A: 0, B: 0, C: 1, D: 1 },
	{ A: 0, B: 0, C: 1, D: 0 },
	{ A: 0, B: 1, C: 1, D: 0 },
	{ A: 0, B: 1, C: 0, D: 0 },
	{ A: 1, B: 1, C: 0, D: 0 },
	{ A: 1, B: 0, C: 0, D: 0 }
]


function setStep(step) {
	A.writeSync(step.A);
	B.writeSync(step.B);
	C.writeSync(step.C);
	D.writeSync(step.D);
	sleep.usleep(2000);
}

function rotate(direction, step) {
	switch (direction) {
		case "left":
			for (var i = 0; i < step.length; i++) {
				setStep(step[i]);
				console.log(step[i])
			}
			break;
		case "right":
			for (var i = 0; i < step2.length; i++) {
				setStep(step2[i]);
				console.log(step2[i])
			}
			break;
	}
}



keypress(process.stdin);
process.stdin.on('keypress', function(ch, key) {
	try {
		switch (key.name) {
			case "o":
				rotate('left', step)
				console.log("camera rotating left");
				break;
			case "p":
				rotate('right', step)
				console.log('work')
				console.log("camera rotating right");
				break;
			case "up":
				motor_up.writeSync(1);
				console.log("motor forward")
				break;
			case "down":
				motor_down.writeSync(1);
				console.log("motor back")
				break;

			case "space":
				motor_up.writeSync(0);
				motor_down.writeSync(0);	
				switch_1.writeSync(0);
				switch_2.writeSync(0);
				console.log("stop");
				break;

			case "q":
				light_middle_1.writeSync(1);
				light_middle_2.writeSync(1);
				console.log("middle light on");
				break;

			case "w":
				light_middle_1.writeSync(0);
				light_middle_2.writeSync(0);
				console.log("middle light off");
				break;

			case "a":
				light_front_left.writeSync(1);
				light_front_right.writeSync(1);
				console.log("front light on");
				break;
			case "s":
				light_front_left.writeSync(0);
				light_front_right.writeSync(0);
				console.log("front light off");
				break;

			case "z":
				light_rear_left.writeSync(1);
				light_rear_right.writeSync(1);
				console.log("rear light on");
				break;
			case "x":
				light_rear_left.writeSync(0);
				light_rear_right.writeSync(0);
				console.log("rear light off");
				break;
			case "j":
				console.log('switch_1 on')
				switch_1.writeSync(1);
				break;
			case "h":
				console.log('switch_2 on')
				switch_2.writeSync(1);
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
