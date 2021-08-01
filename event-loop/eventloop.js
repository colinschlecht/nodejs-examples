import fs from "fs";
import crypto from "crypto";

const start = Date.now();

process.env.UV_THREADPOOL_SIZE= 1;

//Top level code runs first, then the rest is consoled in no particular order
//    because it's not running inside a cb function
setTimeout(() => console.log("timer 1 finished"), 0);
setImmediate(() => console.log("immediate 1 finished"));
// fs.readFile("test-file.txt", () => {
// 	console.log("i/o finished");
// });
console.log("hello from the top level code");
//=> hello from the top level code
//   immediate 1 finished
//   timer 1 finished
//   i/o finished

//All code below runs after all code above. Timer 3 causes event loop to run until timer runs out
//Although timer is before set immediate, set immediate is consoled before set time out because the event loop waits for poll phase events
// fs.readFile("test-file.txt", () => {
// 	console.log("i/o 2 finished");
// 	setTimeout(() => console.log("timer 2 finished"), 0);
// 	setTimeout(() => console.log("timer 3 finished"), 3000);
// 	setImmediate(() => console.log("immediate 2 finished"));
// });

//=>// hello from the top level code
// immediate 1 finished
// timer 1 finished
// i/o finished
// immediate 2 finished
// timer 2 finished
// timer 3 finished

//Adding process.nextick() will run before the others because it runs before the next tick phase, not the next tick loop.
// // fs.readFile("test-file.txt", () => {
// // 	console.log("i/o finished");
// // 	setTimeout(() => console.log("timer 2 finished"), 0);
// // 	setTimeout(() => console.log("timer 3 finished"), 3000);
// // 	setImmediate(() => console.log("immediate 2 finished"));
// //     process.nextTick(()=> console.log("process.nexttick"))
// // });
//=>// hello from the top level code
// immediate 1 finished
// timer 1 finished
// i/o finished
// process.nexttick
// immediate 2 finished
// timer 2 finished
// timer 3 finished

//adding
fs.readFile("test-file.txt", () => {
	console.log("i/o finished");
	setTimeout(() => console.log("timer 2 finished"), 0);
	setTimeout(() => console.log("timer 3 finished"), 3000);
	setImmediate(() => console.log("immediate 2 finished"));
	process.nextTick(() => console.log("process.nexttick"));

	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	
});

//=> hello from the top level code
// immediate 1 finished
// timer 1 finished
// i/o finished
// process.nexttick
// immediate 2 finished
// timer 2 finished
// 912 password encrypted
// 915 password encrypted
// 916 password encrypted
// 918 password encrypted
// timer 3 finished
