var languages = {};
function Git() {
    var self = this;
    
    var GitHubApi = require("github");
    var auth = require("./creds.json");

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

	for(var i = 0; i < repos.length; i++) {
	    console.log(repos[i].languages_url);
	}
    });
    
}
