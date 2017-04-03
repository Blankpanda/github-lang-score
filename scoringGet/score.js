var request = require("request");
    
var GitHubApi = require("github");
var auth = require("./creds.json"); 


var GitHubGetter = function() {
    var self = this;

    self.github = new GitHubApi({
	headers: {
	    "user-agent": 'github-lang-score'
	},
	debug: false
    });

    self.github.authenticate({
	type:"basic",
	username: auth['username'],
	password: auth['password'],	
    });

    self.getRepos = function(callback) {
	self.github.repos.getAll({
	    username: "blankpanda"
	}, function(err,res) {
	    setTimeout(function() {
		var repos = res.data;
		var pendingOps = 0;
		var accumData = [];
		for(var i = 0; i < repos.length; i++){
		    pendingOps++;
		    self.github.repos.getLanguages({
			owner: "blankpanda",
			repo: repos[i].name
		    }, function(err, lres) {
			pendingOps--;
			if(lres != undefined) {
			    accumData.push(lres.data);
			}

			if(pendingOps == 0) {
			    return callback(accumData);
			}
		    });		    
		}

	    },1000);
	});
    };
}


module.exports = GitHubGetter;

