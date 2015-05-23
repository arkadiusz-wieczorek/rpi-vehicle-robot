var motor = {};

var GPIO = require('onoff').Gpio,
	motor[0] = new GPIO(17, 'out'), //up
    motor[1] = new GPIO(22, 'out'), //down
    motor[2] = new GPIO(23, 'out'), //left
    motor[3] = new GPIO(24, 'out'), //right
    iv;

var keypress = require('keypress');

var current_key = undefined;

keypress(process.stdin);
process.stdin.on('keypress', function (ch, key) {
	try{
		switch(key.name){
			case "up":
				console.log("up");
				motor[0].writeSync(1);
				current_key = 0;
			break;
			case "down":
				console.log("down");
				motor[1].writeSync(1);
				current_key = 1;
			break;
			case "left":
				console.log("left");
				motor[2].writeSync(1)
				current_key = 2;
			break;
			case "right":
				console.log("right");
				motor[3].writeSync(1)
				current_key = 3;
			break;
			case "space":
				console.log("space");
				motor[current_key].writeSync(0);
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