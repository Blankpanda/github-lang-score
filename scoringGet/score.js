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


// function getKeys(res) {
//     var array  = [];
//     array.push(Object.keys(res.data));
//     return array;
// }

// function concatKeys(keysArray) {
//     var array = [];    
//     for(var i = 0; i < keysArray.length; i++) {
// 	array = array.concat(keysArray[i]);	
//     }
//     console.log(array);
// }

// function arrayUnique(array) {
//     var a = array.concat();
//     for(var i = 0; i < a.length; i++) {
//         for(var j = i + 1; j < a.length; j++) {
//             if(a[i] === a[j])
//                 a.splice(j--, 1);
//         }
//     }
//     return a;
// }

// function aggregateLang(json) {
//     //    json = pruneRepeats(json);
//     var cc = 0;
//     for(attr in json) {
// 	if(inLanguages(attr)){
// 	    languages[attr] += json[attr];
// 	} else {
// 	    languages[attr] = json[attr];
// 	    //console.log(attr + ": " + languages[attr]);

// 	}
//     }

// }

// function pruneRepeats(json) {

// }

// function inLanguages(attribute) {
//     for(attr in languages) {
//         if(attr == attribute) {
//             return true;        
//         }
//     }
//     return false;
// }


// function printLanguages() {
//     for(attr in languages) {
//         console.log(attr + ": " + languages[attr]);
//     }
// }
