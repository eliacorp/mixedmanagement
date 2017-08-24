"use strict"

let express = require("express");
let bodyParser = require('body-parser');
let routes  = require('./routes');
let path = require('path');
var util = require('util');
let ejs = require('ejs');
let Prismic = require('prismic-nodejs');
let PrismicConfig = require('./api/prismic/config.js');
let app = express();



app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/../client');
app.use( express.static(__dirname + "/../client") );
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



// This is the configuration for prismic.io
app.use((req, res, next) => {
  Prismic.api(PrismicConfig.apiEndpoint, { req })
  // accessToken: PrismicConfig.accessToken,
  .then((api) => {
    req.prismic = { api };
    // res.locals.ctx = {
    //   endpoint: PrismicConfig.apiEndpoint,
    //   linkResolver: PrismicConfig.linkResolver
    // };
    next();
  }).catch((err) => {
    const message = err.status === 404 ? 'There was a problem connecting to your API, please check your configuration file for errors.' : `Error 500: ${err.message}`;
    res.status(err.status).send(message);
  });
});

// app.get('/api/tour/:artist/get', function(req, res){
//   tour.get(req, res);
// });

app.get('/api/prismic/list',(req, res) => {
  console.log("query");
  console.log(req.query);
  var type = req.query.type;
  var page = req.query.page;
  var order = req.query.order;
  var filter = req.query.filter;

  console.log('page', req.query.page);

var predicates =[
  Prismic.Predicates.at("document.type", type)
]

// if(req.query.filter){
//   predicates.push(Prismic.Predicates.at('document.tags', [filter]));
// }

  req.prismic
  .api.query(
      predicates,
      { orderings : '['+order+']', pageSize : 50, page : page }
  )
    .then((document) => {
      res.json( document );
    })
    .catch((err) => {
    // Don't forget error management
      res.status(500).send(`Error 500: ${err.message}`);
    });


});





app.get('*', routes.index);

app.listen(8081, () => console.log("listening on 8081"));
