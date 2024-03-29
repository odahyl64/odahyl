const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const compression = require('compression');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const db = require('./config/keys').mongoURI;
const CronJob = require('cron').CronJob;
const crons = require('./config/crons');

require('dotenv').config();

// Instantiate express
const app = express();
app.use(compression());

// Passport Config
require('./config/passport')(passport);

// DB Config

// Connect to MongoDB
mongoose
    .connect(
        db, {useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useCreateIndex: true},
    )
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.use(cors());



// Express body parser
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// REACT BUILD for production
if (process.env.NODE_ENV === 'PROD') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


// Initialize routes middleware
app.use('/api/users', require('./routes/users'));

// run at 3:10 AM -> delete old tokens
const tokensCleanUp = new CronJob('10 3 * * *', function() {
  crons.tokensCleanUp();
});
tokensCleanUp.start();

const PORT = process.env.PORT;


http.createServer({
}, app)
    .listen(PORT, function() {
      console.log('App listening on port ' + PORT + '! Go to http://localhost:' + PORT + '/');
    });



function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}