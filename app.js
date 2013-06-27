
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
app.use(express.compiler({ src : __dirname + '/public', enable: ['less']}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Compatible

        // Now less files with @import 'whatever.less' will work(https://github.com/senchalabs/connect/pull/174)
var TWITTER_BOOTSTRAP_PATH = './vendor/twitter/bootstrap/less';
express.compiler.compilers.less.compile = function(str, fn){
  try {
    var less = require('less');var parser = new less.Parser({paths: [TWITTER_BOOTSTRAP_PATH]});
    parser.parse(str, function(err, root){fn(err, root.toCSS());});
  } catch (err) {fn(err);}
}

// Routes
app.set('view options', { pretty: true });
app.get('/', routes.comingsoon);
app.get('/about', routes.about);
app.get('/features', routes.features);
app.get('/services', routes.services);
app.get('/contact', routes.contact);
app.get('/signup', routes.signup);
app.get('/signin', routes.signin);
app.get('/privacy-policy', routes.privacypolicy);
app.get('/terms-of-service', routes.termsofservice);
app.get('/reset', routes.reset);
app.get('/pricing', routes.pricing);
app.get('/blog', routes.blog);
app.use(function(req, res, next){
  res.render('404.jade', {title: "404 - Page Not Found", showFullNav: false, status: 404, url: req.url });
});
app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});