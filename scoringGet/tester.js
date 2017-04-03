var GitHubGetter = require("./score.js");

var get = new GitHubGetter();

var f = {};
get.getRepos(function(response){

    parseResponse(response);
    setTimeout(printf,5000);
    return;
});



function printf() {
    console.log(f);
}
function parseResponse(r) {
    for(k in r) {
	if(f[k] == r[k]) {
	    f[k] += r[k];	    
	} else {
	    f[k] = r[k]
	}

    }
}
