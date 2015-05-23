var keypress = require('keypress');

keypress(process.stdin);
process.stdin.on('keypress', function (ch, key) {
	try{
		switch(key.name){
			case "up":
			
			break;
			case "down":
			
			break;
			case "left":
			
			break;
			case "right":
			
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