var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8222);
app.use(express.static('public'));


//renders home page
app.get('/',function(req,res,next){
    res.render('home');
});


app.get('/searchWine',function(req,res,next) {
    mysql.pool.query('SELECT w.name, w.price, w.year, wy.name AS wyname, v.name AS vname FROM wine w ' +
        'LEFT JOIN variety v ON v.id = w.winery_id LEFT JOIN winery wy ON wy.id = w.winery_id WHERE w.year > ?',
        [req.query.year],
        function (err, rows, fields) {
            if (err) {
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(rows);
        });
});


app.get('/deleteWine',function(req,res,next) {
    mysql.pool.query('DELETE FROM wine WHERE name = ?', [req.query.name],
        function (err, rows, fields) {
            if (err) {
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(rows);
        });
});


app.get('/getWineTable',function(req,res,next){
    mysql.pool.query('SELECT w.name, w.price, w.year, wy.name AS wyname, v.name AS vname FROM wine w ' +
        'LEFT JOIN variety v ON v.id = w.winery_id LEFT JOIN winery wy ON wy.id = w.winery_id',
        function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        res.type('text/plain');
        res.send(rows);
    });
});


app.get('/getWineryTable',function(req,res,next){
    mysql.pool.query('SELECT wy.name, wy.city, r.name AS rname FROM winery wy ' +
        'LEFT JOIN region r ON r.id = wy.region_id',
        function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(rows);
        });
});


app.get('/getRegionVarietyTable',function(req,res,next){
    mysql.pool.query('SELECT r.name AS rname, v.name AS vname FROM region r ' +
        'INNER JOIN region_variety rv ON rv.region_id = r.id INNER JOIN variety v ON v.id = rv.variety_id',
        function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(rows);
        });
});


app.get('/addWine',function(req,res,next){
    mysql.pool.query("INSERT INTO wine (name,price,year,winery_id,variety_id) VALUES " +
        "(?,?,?,(SELECT id FROM winery WHERE name = ?),(SELECT id FROM variety WHERE name = ?))",
        [req.query.name,req.query.price,req.query.year,req.query.winery,req.query.variety], function(err, result){
            if(err){
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(result);
        });
});


app.get('/addRegion',function(req,res,next){
    mysql.pool.query("INSERT INTO region (name,country,climate,soil_type) VALUES (?,?,?,?)",
        [req.query.name,req.query.country,req.query.climate,req.query.soil_type], function(err, result){
            if(err){
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(result);
        });
});


app.get('/addVariety',function(req,res,next){
    mysql.pool.query("INSERT INTO variety (name) VALUE (?)",
        [req.query.name], function(err, result){
            if(err){
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(result);
        });
});


app.get('/addWinery',function(req,res,next){
    mysql.pool.query("INSERT INTO winery (name,city,region_id) VALUES (?,?, (SELECT id FROM region WHERE name = ?))",
        [req.query.name,req.query.city,req.query.region],
        function(err, result){
            if(err){
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(result);
        });
});


app.get('/addVarietyRegion',function(req,res,next){
    mysql.pool.query("INSERT INTO region_variety (region_id,variety_id) VALUES " +
        "((SELECT id FROM region WHERE name = ?),(SELECT id FROM variety WHERE name = ?))",
        [req.query.region,req.query.variety],
        function(err, result){
            if(err){
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(result);
        });
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
