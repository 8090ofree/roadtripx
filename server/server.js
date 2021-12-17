require('dotenv').config();
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
var passport = require('passport');
require('./lib/passport');
const app = express();
const path = require('path')
app.use(passport.initialize());

const PORT = process.env.PORT || 3001
const mongoose = require('mongoose');
const URI = process.env.MONGODBURL;

mongoose.connect(URI, {
useNewUrlParser: true, 
useUnifiedTopology: true 
}, err => {
if(err) throw err;
console.log('mongodb connected')
});
mongoose.Schema.Types.Boolean.convertToFalse.add('');

app.use(compression());
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(cookieParser());
routes.addRoutes(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    });
}

app.listen(PORT, ()=>console.log(`live at ${PORT}`))


process.on('uncaughtException', err => console.log('uncaughtException: ' + err))