

const express = require('express');
const request = require('request');
const app = express();
const port = 8000;

const API_URL = 'http://loremricksum.com/api/';
const FIRST_PARAM = 'paragraphs=';
const SECOND_PARAM = 'quotes=';

const NUM_REQUESTS = 3;

// This will take a bit of time, and will be called asynchronously...
function randomHTTPRequest (input1, input2) {
	console.log('Request Number: ' + input1.toString());
	const URL = API_URL + '?' + FIRST_PARAM + input1.toString() + '&' + SECOND_PARAM + input2.toString();
	request(URL, function (error, response, body) {
			console.log(body);
		});
}

// Essentially the same function as randomHTTPRequest, but it returns it as a promise
// with the reject & resolve handled in its callback.
function randomHTTPRequestWithPromise (input1, input2) {
	const URL = API_URL + '?' + FIRST_PARAM + input1.toString() + '&' + SECOND_PARAM + input2.toString();
	return new Promise(function (resolve, reject) {
		request(URL, function (error, response, body) {
			if (error) {
				reject('Something went wrong...');
			}
			const data = {
				message:'Request Number: ' + input1.toString(), 
				body: body
			};
			resolve(data);
		});
	});
}



app.get('/', function (req, res) {
	res.send('Hello world!');
	// This won't work. The request will take time, so it'll happen after all the logging to console is done
	for (var i = 1; i <= NUM_REQUESTS; i++) {
		randomHTTPRequest(i, i);
	}

	// Wait for some arbitrarily long amount of time for requests to happen...
	setTimeout(function () {
		console.log('\n\n\n\n\n\n\nNow THAT is over...\n\n\n\n\n\n\n');
		var promises = [];
		for (var i = 1; i <= NUM_REQUESTS; i++) {
			promises[i] = randomHTTPRequestWithPromise(i, i);
		}

		// Up until here, it's been a very similar process, but now we need to resolve promises
		
		// Promise.all ensures that all promises in the array are executed in order
		Promise.all(promises).then(function (data) {
			data.forEach(function (quote) {
				if (quote != null) {
					console.log(quote.message + '\n');
					console.log(quote.body);
					console.log('\n\n\n');
				}
			});
		});
	}, 3000);
});


app.listen(port, function () {
	console.log('Listening on port ' + port.toString());
});

