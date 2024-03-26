
const fs = require('fs');
const path = require('path');
const booksPath = path.join(__dirname, 'db', 'books.json');

function read(req, res) {
	fs.readFile(booksPath, 'utf8', (err, books) => {
		if (err) {
			console.log(err);
			res.writeHead(400);
			res.end('An error occured');
		}
		res.writeHead(200);
		res.end(books);
})
}

function getAllBooks(req,res) {
	read(req, res);
}

function addBook(req,res) {
	let newBook = '';
	req.on('data', (chunk) => {
		newBook += chunk;
	}
	)
	fs.readFile(booksPath, 'utf8', (err, books) => {
		if (err) {
			console.log(err);
			res.writeHead(400);
			res.end('An error occured');
		}
	const allBooks = [...JSON.parse(books), JSON.parse(newBook)];
	fs.writeFile(booksPath, JSON.stringify(allBooks), (err) => {
		if (err) {
			console.log(err);
			res.writeHead(500);
			res.end(JSON.stringify({message: 'Server error. Unable to write to database'}));
		}
		res.writeHead(201);
		res.end(newBook);
		})
})
}

function updateBook(req,res) {
	let updateDetails = '';
	req.on('data', (chunk) => {
		updateDetails += chunk;
})
	req.on('end', () => {
	const parsedDetails = JSON.parse(updateDetails);
	console.log(parsedDetails);
	fs.readFile(booksPath, 'utf8', (err, books) => {
		if (err) {
			console.log(err);
			res.writeHead(400);
			res.end('An error occured');
		}
	const allBooks = JSON.parse(books);
	const updateIndex = allBooks.findIndex(book => book.id === parsedDetails.id);
	console.log(updateIndex);
	allBooks[updateIndex] = {...allBooks[updateIndex], ...parsedDetails};
	fs.writeFile(booksPath, JSON.stringify(allBooks), (err) => {
		if (err) {
			console.log(err);
			res.writeHead(500);
			res.end(JSON.stringify({message: 'Server error. Unable to write to database'}));
		}
		res.writeHead(200);
		res.end(JSON.stringify(allBooks[updateIndex]));
		})
})
})

}

function deleteBooks(req,res) {
	let details = '';
	req.on('data', (chunk) => {
		details += chunk;
})
	req.on('end', () => {
	const parsedDetails = JSON.parse(details);
	console.log(parsedDetails);
	fs.readFile(booksPath, 'utf8', (err, books) => {
		if (err) {
			console.log(err);
			res.writeHead(400);
			res.end('An error occured');
		}
	const allBooks = JSON.parse(books);
	const updateIndex = allBooks.findIndex(book => book.id === parsedDetails.id);
	console.log(updateIndex);
	allBooks.splice(updateIndex, 1);
	fs.writeFile(booksPath, JSON.stringify(allBooks), (err) => {
		if (err) {
			console.log(err);
			res.writeHead(500);
			res.end(JSON.stringify({message: 'Server error. Unable to write to database'}));
		}
		res.writeHead(200);
		res.end(JSON.stringify(allBooks));
		})
})
})

}
module.exports = {getAllBooks, addBook, updateBook, deleteBooks};
