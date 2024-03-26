const http = require("http");
const server = http.createServer(requestHandler);
const HOSTNAME = 'localhost';
const PORT = '4000';
const {getAllBooks, addBook, updateBook, deleteBooks } = require('./helpers');
const {authenticate} = require('./authenticate.js');

function requestHandler(req, res) {
	if (req.url === '/books' && req.method === 'GET') {
		authenticate(req,res)
			.then(() => getAllBooks(req, res))
			.catch(err => {
				res.writeHead(400);
				res.end(JSON.stringify({"error": err}))
})
	}
	if (req.url === '/books' && req.method === 'POST') {
			addBook(req, res);
	}
	if (req.url === '/books' && req.method === 'PUT') {
		updateBook(req, res);
	}
	if (req.url === '/books' && req.method === 'DELETE') {
		deleteBooks(req, res);
	  }
	  }

server.listen(PORT, HOSTNAME, () => console.log(`Server running on ${HOSTNAME} port ${PORT}`));
