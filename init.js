var motor = {};

var GPIO = require('onoff').Gpio,
	motor_up = new GPIO(17, 'out'), //up
<<<<<<< HEAD
    	motor_down = new GPIO(22, 'out'), //down
    	motor_left  = new GPIO(23, 'out'), //left
    	motor_right = new GPIO(24, 'out'), //right
    	enable_1 = new GPIO(25, 'out'), //enable-1 L293DNE
	light_front_left = new GPIO(16, 'out'),
	light_front_right = new GPIO(20, 'out'),
	light_rear_left = new GPIO(19, 'out'),
	light_rear_right = new GPIO(26, 'out'),
=======
    motor_down = new GPIO(22, 'out'), //down
    motor_left  = new GPIO(23, 'out'), //left
    motor_right = new GPIO(24, 'out'), //right
    enable_1 = new GPIO(25, 'out'), //enable-1 L293DNE
>>>>>>> 99d5d0f5f419c005608854e8573d2d7de7c926fe
    iv;

motor[0] = motor_up;
motor[1] = motor_down;
motor[2] = motor_left;
motor[3] = motor_right;

enable_1.writeSync(1);

var keypress = require('keypress');

var current_key = undefined;

keypress(process.stdin);
process.stdin.on('keypress', function (ch, key) {
	try{
		switch(key.name){
			case "up":
				current_key = 0;
				console.log("up");
				motor[current_key].writeSync(1);
			break;
			case "down":
				current_key = 1;
				console.log("down");
				motor[current_key].writeSync(1);
			break;
			case "left":
				current_key = 2;
				console.log("left");
				motor[current_key].writeSync(1)
			break;
			case "right":
				current_key = 3;
				console.log("right");
				motor[current_key].writeSync(1)
			break;
			case "space":
				console.log("space");
				for (var i = 0; i < 4; i++) {
					motor[i].writeSync(0);
				};
			break;
			case "q":
				console.log("light-front-left on");
				light_front_left.writeSync(1);
			break;
			case "w":
				console.log("light-front-right on");
				light_front_right.writeSync(1);
			break;
			case "a":
				console.log("rear-lights on");
				light_rear_left.writeSync(1);
				light_rear_right.writeSync(1);
			break;
			case "s":
				console.log("rear-lights off");
				light_rear_left.writeSync(0);
				light_rear_right.writeSync(0);
			break;
			case "e":
				console.log("front-lights off");
				light_front_left.writeSync(0);
				light_front_right.writeSync(0);
			break;
		}	

	}catch(error){
		throw error;
	}

	if (key && key.ctrl && key.name == 'c') {
		process.stdin.pause();
	}
});
process.stdin.setRawMode(true);
process.stdin.resume();
