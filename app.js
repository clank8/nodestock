//Stock Market Portfolio
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));



//API KEY pk_a3d4aa8a9443411e87320255fbd8373c
// create call_api function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_a3d4aa8a9443411e87320255fbd8373c', {json:true}, (err, res, body) => {
	if (err) {return console.log(err);}		
	if (res.statusCode === 200){
			finishedAPI(body);
		};
	});
};


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherStuff = "hello, this is other stuff";

// Set handlebar index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home', {
    	stock: doneAPI
    	});
	}, "fb");
});    

// Set handlebar indexPOST route
app.post('/', function (req, res) {
	call_api(function(doneAPI){
		//posted_stuff = req.body.stock_ticker;
		res.render('home', {
    	stock: doneAPI    	
    	});
	}, req.body.stock_ticker);
});    

// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});


//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));