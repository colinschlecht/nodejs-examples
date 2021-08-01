import EventEmitter from "events";
import http from "http";

class Sales extends EventEmitter {
	constructor() {
		super();
	}
}

const myEmitter = new Sales();

//Event listener
myEmitter.on("newSale", () => {
	console.log("There was a new sale!");
});
myEmitter.on("newSale", () => {
	console.log("customer: colin");
});

myEmitter.on("newSale", (stock) => {
	console.log(`there are now ${stock} items left in stock.`);
});

//object emitting event
myEmitter.emit("newSale", 9);

/////////////////

const server = http.createServer();

server.on("request", (req, res) => {
	console.log("Request recieved");
	res.end("Request recieved");
});
server.on("request", (req, res) => {
	console.log("another request");
});
server.on("close", (req, res) => {
	res.end("Server Closed");
});

server.listen(8000, "127.0.0.1", () => {
	console.log("waiting for requests");
});
