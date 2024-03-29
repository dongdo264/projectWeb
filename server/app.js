const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const route = require("./routes/index");
var bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();

// lay du lieu tu form gui ve
app.use(express.urlencoded({
    limit: '50mb',
    extended : true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(cors({origin: true}));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
      //secure: true 
    }
}))

//app.use(express.static('public'));
app.use(cookieParser('MY SECRET'));

//app.use(appMiddleware);

route(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
