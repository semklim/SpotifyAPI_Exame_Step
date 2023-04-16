const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.argv[2] === '8888' ? 8888 : 8883;
const link = `http://localhost:${PORT}/`;


function getContentType (fileExtension) {
	switch (fileExtension) { // determine the content type based on the file extension
		case '.html':
			return 'text/html';
		case '.css':
			return 'text/css';
		case '.js':
			return 'text/javascript';
		default:
			return 'text/plain';
	}
}

function getCacheControl (contentType) {
	switch (contentType) { // determine the cache control header based on the content type
		case 'text/html':
			return 'no-cache';
		case 'text/css':
		case 'text/javascript': {
			return 'must-revalidate, max-age=18000';
		}
		default:
			return 'public, max-age=18000';
	}
}


const server = http.createServer((req, res) => {
	let filePath = '.' + req.url;

	if (filePath === './') {
		filePath = path.join(__dirname, '/index.html');
	} else {
		filePath = path.join(__dirname, req.url);
	}

	if (filePath.includes('?code')) {
		filePath = path.join(__dirname, '/callback.html');
	}


	// Set the content-type header based on the file type
	const fileExtension = String(path.extname(filePath)).toLowerCase();
	const contentType = getContentType(fileExtension);

	const cacheControl = getCacheControl(contentType); // determine the cache control header based on the content type


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
			res.writeHead(200, {
				'Content-Type': contentType,
				'Cache-Control': cacheControl
			});
			res.end(content, 'utf-8');
		}
	});
});

server.listen(PORT, () => {
	console.log(`\nServer running at \x1b[35m\x1b[4m${link}\x1b[0m`); //https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
});
