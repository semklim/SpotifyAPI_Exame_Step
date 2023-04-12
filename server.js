const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8888;
const link = `http://localhost:${PORT}/`;

const server = http.createServer((req, res) => {
	let filePath = '.' + req.url;
	if (filePath === './') {
		filePath = './index.html';
	}
	if (filePath.includes('./callback.html?code')) {
		filePath = './callback.html';
	}

	// Set the content-type header based on the file type
	const extname = String(path.extname(filePath)).toLowerCase();
	let contentType = 'text/html';
	if (extname === '.js') {
		contentType = 'text/javascript';
	}
	if (extname === '.css') {
		contentType = 'text/css';
	}
	// Read the file contents from disk
	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code === 'ENOENT') {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('<h1>404 Not Found</h1><p>The requested URL ' + req.url + ' was not found on this server.</p>');
			} else {
				res.writeHead(500, { 'Content-Type': 'text/html' });
				res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem with the server.</p>');
			}
		} else {
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content, 'utf-8');
		}
	});
});

server.listen(PORT, () => {
	console.log(`\nServer running at \x1b[35m\x1b[4m${link}\x1b[0m`); //https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
});
