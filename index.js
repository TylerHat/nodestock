//Stock market app by Tyler Hatfield

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 7000;


// user body parser Middleware

app.use(bodyParser.urlencoded({extended: false}));




//API KEY pk_b5523af07d924bd091cfcae3a1bda8a7 
function call_api(finishedAPI, ticker){
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_b5523af07d924bd091cfcae3a1bda8a7', { json: true }, (err, res, body) => {
	if(err) {return console.log(err);}
		if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});	
};


//set handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff";

//set handlebar index routes
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home', {
    		stock: doneAPI
   		 });
	}, 'fb');
});
//call_api(function, req.body.stock_ticker )
//set handlebar index post routes
app.post('/', function (req, res) {
	call_api(function(doneAPI){
		//posted_report = req.body.stock_ticker;
			res.render('home', {
    		stock: doneAPI,	
   		 });
	}, req.body.stock_ticker);
});

//set about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));





app.listen(PORT, () => console.log('Server listening on port ' + PORT));