const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherStuff = "hello, this is other stuff";

// Set handlebar routs
app.get('/', function (req, res) {
    res.render('home', {
    	stuff: otherStuff
    });
});

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));