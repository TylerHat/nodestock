//Stock market app by Tyler Hatfield

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');


const PORT = process.env.PORT || 7000;

//set handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff";

//set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
    	stuff: "This is stuff...",
    	stuff1: otherstuff
    });

});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));





app.listen(PORT, () => console.log('Server listening on port ' + PORT));