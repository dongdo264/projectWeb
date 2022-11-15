const express = require('express');
const numeral = require('numeral');
const { engine } = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const route = require("./routes/index");

const app = express();

// lay du lieu tu form gui ve
app.use(express.urlencoded({
    extended : true
}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
      //secure: true 
    }
}))

app.engine('handlebars', engine({
    helpers: {
        section : express_handlebars_sections(),
        format_number : function(value) {
            return numeral(value).format('0,0');
        }
    }
}
));
app.set('view engine', 'handlebars');


//app.use(express.static('public'));
app.use(cookieParser('MY SECRET'));

//app.use(appMiddleware);

route(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
