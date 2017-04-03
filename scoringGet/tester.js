var GitHubGetter = require("./score.js");

var get = new GitHubGetter();

var f = {};
get.getRepos(function(response){

    parseResponse(response);
//    parseResponse(response);
    // return;
});



function printf() {
    console.log(f);
}
function parseResponse(response) {

    for(var i = 0; i < response.length; i++) {

	for(responseKey in response[i]) {
	    if(responseKey in f) {
		f[responseKey] += response[i][responseKey];
	    } else {
		f[responseKey] = response[i][responseKey];
	    }	    
	}
    }

    console.log(f);
}

