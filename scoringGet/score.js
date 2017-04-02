var request = require("request");
    
var GitHubApi = require("github");
var auth = require("./creds.json"); 

var languages = {};

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
                aggregateLang(res.data); // TODO: Prune repeats
	    }
	});
    }
 });

function aggregateLang(json) {
    //    json = pruneRepeats(json);
    var cc = 0;
    for(attr in json) {
//         if(!(inLanguages(attr))) {
//             console.log(attr);
// //            languages[attr] += json[attr];
        //         }
        console.log(attr + ": " + cc);
        cc++
    }
    console.log("\n");
}

function pruneRepeats(json) {

}
function inLanguages(attribute) {
    for(attr in languages) {
        if(attr == attribute) {
            return true;        
        }
    }
    return false;
}


function printLanguages() {
    for(attr in languages) {
        console.log(attr + ": " + languages[attr]);
    }
}
