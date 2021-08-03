import fs from "fs";
import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
	// solution 1 - not streams
	// fs.readFile("test-file.txt", (err, data) => {
	// 	if (err) console.log(err);
	//     res.end(data)
	// });

	// solution 2 - streams
	//this one will experience backpressure due to the read stream being
	//faster than the back end can write it and send. CAN'T SEND AS FAST AS IT CAN RECIEVE
	// const readable = fs.createReadStream("test-file.txt");
	// readable.on("data", (chunk) => {
	// 	//res is a writable stream
	// 	res.write(chunk);
	// });
	//when it's done writing, end is emitted and res.end() occurs
	//must have data and end
	// 	readable.on("end", () => {
	// 		res.end();
	// 	});
	// 	readable.on("error", (err) => {
	// 		console.log(err);
	// 		res.statusCode = 500;
	// 		res.end(err);
	// 	});

	//solution 3 (pipe the output of the read stream to the input of the write stream)
    //this will fix backpressure because it will automatically handle speed coming in and out.
    //readablesource.pipe(writeableDest) example:
	const readable = fs.createReadStream("test-file.txt");
	readable.pipe(res);
    
});

server.listen(8000, "127.0.0.1", () => {
	console.log("waiting for requests");
});
