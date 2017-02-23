var request = require("request");
    
var GitHubApi = require("github");
var auth = require("./creds.json"); 

var languages = [];

var github = new GitHubApi({
    headers: {
	"user-agent": 'github-lang-score'
    },
    debug: false
});

github.authenticate({
    type:"basic",
    username: auth['username'],
    password: auth['password'],
});

github.repos.getAll({
    username: "blankpanda"
}, function(err, res) {
    var repos = res.data;
    for(var i = 0; i < repos.length;i++) {
	github.repos.getLanguages({
	    owner: "blankpanda",
	    repo: repos[i].name,
	}, function (err, res) {
	    if(res != undefined) {
		console.log(res.data);
	    }

	});
    }

 });

