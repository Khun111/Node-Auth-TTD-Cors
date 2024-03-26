const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, 'db', 'users.json');

function getAllUsers() {
	return new Promise((resolve, reject) => {
	fs.readFile(userPath, 'utf8', (err, users) => {
			if (err) reject("An error occured while getting users");
			resolve(JSON.parse(users));
		})
		})
}

async function authenticate(req, res) {
    return new Promise((resolve, reject) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})
	req.on('end', async() => {
		console.log(body);
		const parsedBody = JSON.parse(body);
		if(!parsedBody) {
		reject("Please enter your username and password");
		}
		const users = await getAllUsers();
		const userFound = users.find(user => user.username === parsedBody.username);
		if(!userFound) {
		reject("User does not exist. Sign up instead");
		}
		if (userFound.password !== parsedBody.password) {
		reject("Password is incorrect");
		}
		resolve(userFound)
		});
		});
}
module.exports = {authenticate};
