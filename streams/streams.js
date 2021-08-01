import fs from "fs";
import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
	// solution 1 - not streams
	// fs.readFile("test-file.txt", (err, data) => {
	// 	if (err) console.log(err);
	//     res.end(data)
	// });

    // solution 2 - not streams
	const readable = fs.createReadStream("test-file.txt");
	readable.on("data", (chunk) => {
		res.write(chunk);
	});
});

server.listen(8000, "127.0.0.1", () => {
	console.log("waiting for requests");
});
