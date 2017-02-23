var express = require("express");
var bodyParser = require('body-parser');
var app = express();
//var http = require('http');
var router = express.Router();
var path = __dirname + "/";

//var server = http.createServer(app);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
});

router.get("/",function(req,res){
    res.sendFile(path + "index.html");
});

app.use("/", router);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000,function(){
    console.log("Listening on port 3000");
});


var  foo = function() {
    console.log('haha');
}


app.post('/', jsonParser, function(req, res) {
    console.log(req.body);
});


