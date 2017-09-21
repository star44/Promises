

const express = require('express');
const request = require('request');
const app = express();
const port = 8000;

const API_URL = 'http://loremricksum.com/api/';
const FIRST_PARAM = 'paragraphs=';
const SECOND_PARAM = 'quotes=';

function randomHTTPRequest (input1, input2) {
	const URL = API_URL + '?' + FIRST_PARAM + input1.toString() + '&' + SECOND_PARAM + input2.toString();
	request(URL, function (error, response, body) {
			console.log(body);
		});
}


app.get('/', function (req, res) {
	res.send('Hello world!');
	for (var i = 0; i < 10; i++) {
		console.log('Request Number: ' + i.toString());
		randomHTTPRequest(i, i);
	}
});

app.listen(port, function () {
	console.log('Listening on port ' + port.toString());
});