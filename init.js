var motor = {};

var GPIO = require('onoff').Gpio,
	motor_up = new GPIO(17, 'out'), //up
    motor_down = new GPIO(22, 'out'), //down
    motor_left  = new GPIO(23, 'out'), //left
    motor_right = new GPIO(24, 'out'), //right
    iv;

motor[0] = motor_up;
motor[1] = motor_down;
motor[2] = motor_left;
motor[3] = motor_right;

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