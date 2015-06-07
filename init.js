var stepper = {};

var keypress = require('keypress');
var GPIO = require('onoff').Gpio,
    n1 = new GPIO(6, 'out'), //motor stepper
    n2 = new GPIO(13, 'out'),
    n3 = new GPIO(19, 'out'),
    n4 = new GPIO(26, 'out'),
	motor_up = new GPIO(23, 'out'), //motor DC +/-
	motor_down  = new GPIO(24, 'out'), //motor DC -/+
	enable_1 = new GPIO(25, 'out'), //L293DNE
	light_front_left = new GPIO(18, 'out'),
	light_front_right = new GPIO(11, 'out'),
	light_rear_left = new GPIO(16, 'out'),
	light_rear_right = new GPIO(20, 'out'),
	iv;

enable_1.writeSync(1);

function setStep(w1, w2, w3, w4){
	n1.writeSync(w1);
	n2.writeSync(w2);
	n3.writeSync(w3);
	n4.writeSync(w4);
}

function left() {
    setTimeout(function() {setStep(0,0,0,1);}, 0);
    setTimeout(function() {setStep(0,0,1,1);}, 5);
	setTimeout(function() {setStep(0,0,1,0);}, 10);
	setTimeout(function() {setStep(0,1,1,0);}, 15);
	setTimeout(function() {setStep(0,1,0,0);}, 20);
	setTimeout(function() {setStep(1,1,0,0);}, 25);
	setTimeout(function() {setStep(1,0,0,0);}, 35);
	setTimeout(function() {setStep(1,0,0,1);}, 40);
	setTimeout(function() {setStep(0,0,0,1);}, 45);
    setTimeout(function() {setStep(0,0,1,1);}, 50);
	setTimeout(function() {setStep(0,0,1,0);}, 55);
	setTimeout(function() {setStep(0,1,1,0);}, 60);
	setTimeout(function() {setStep(0,1,0,0);}, 65);
	setTimeout(function() {setStep(1,1,0,0);}, 70);
	setTimeout(function() {setStep(1,0,0,0);}, 75);
	setTimeout(function() {setStep(1,0,0,1);}, 80);
	setTimeout(function() {setStep(0,0,0,0);}, 85);
}

function right() {
	setTimeout(function() {setStep(1,0,0,0);}, 0);
	setTimeout(function() {setStep(1,1,0,0);}, 5);
	setTimeout(function() {setStep(0,1,0,0);}, 10);
	setTimeout(function() {setStep(0,1,1,0);}, 15);
	setTimeout(function() {setStep(0,0,1,0);}, 20);
	setTimeout(function() {setStep(0,0,1,1);}, 25);
	setTimeout(function() {setStep(0,0,0,1);}, 30);
	setTimeout(function() {setStep(1,0,0,1);}, 35);
	setTimeout(function() {setStep(1,0,0,0);}, 40);
	setTimeout(function() {setStep(1,1,0,0);}, 45);
	setTimeout(function() {setStep(0,1,0,0);}, 50);
	setTimeout(function() {setStep(0,1,1,0);}, 55);
	setTimeout(function() {setStep(0,0,1,0);}, 60);
	setTimeout(function() {setStep(0,0,1,1);}, 65);
	setTimeout(function() {setStep(0,0,0,1);}, 70);
	setTimeout(function() {setStep(1,0,0,1);}, 75);
	setTimeout(function() {setStep(0,0,0,0);}, 80);
}


keypress(process.stdin);
process.stdin.on('keypress', function (ch, key) {
	try{
		switch(key.name){
			case "o":
				left();
				console.log("camera rotating left");
			break;
			case "p":
				right();
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
				console.log("stop");
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
