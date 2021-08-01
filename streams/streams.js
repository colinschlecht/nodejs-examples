import fs from "fs";
import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
	// solution 1
	fs.readFile("test-file.txt", (err, data) => {
		if (err) console.log(err);
        res.end(data)
	});
});


server.listen(8000, "127.0.0.1", () => {
	console.log("waiting for requests");
});
