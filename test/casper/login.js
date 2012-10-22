var casper = require('casper').create({
	stepTimeout: 10000,
    /*verbose : true,*/
    /*logLevel: "debug"*/
	/*clientScripts: ['lib/sencha-touch-all-debug.js']*/
});

var HOST = 'http://localhost/Raxa-JSS/src/';
casper.start(HOST, function() {
    // Set reasonable size for screenshots
    casper.viewport(1024, 768);
    /*casper.page.settings.userName = "";*/

    // Clear auth headers
    /*casper.setHeaders({});    */
    /*this.echo(casper.page.settings.userAgent, 'INFO');*/
    /*this.echo(casper.page.cookies, 'INFO');*/
    var bar;
    for (bar in casper.page)
    {
        this.echo(bar, 'INFO');
    }
    
    this.echo(casper.page.customHeader);

});

var usernameInput = "#userName input";
var passwordInput = "#passwordID input";
var signInButton = "#signInButton";

casper.then(function() {
	this.test.assertUrlMatch(/^http:\/\/localhost\/Raxa-JSS\/src\/$/, 'Opened Raxa');
	this.test.assertExists(usernameInput, 'Found usename input');
	this.test.assertExists(passwordInput, 'Found password input');
	this.test.assertExists(signInButton, 'Found sign in button');
	this.capture('1.png');
})

casper.then(function() {
	this.echo('Page title is: ' + this.evaluate(function() {
		return document.title;
	}), 'INFO');

	casper.evaluate(function(usernameInput, username, passwordInput, password) {
		document.querySelector(passwordInput).value = password;
		document.querySelector(usernameInput).value = username;
		casper.capture('2.png');
	},
	{
		username: 'admin',
		password: 'Hello123',
		usernameInput: "#userName input",
		passwordInput: "#passwordID input",
		signInButton: "#signInButton span.x-button-label"
	});

	casper.then(function() {
            /*this.echo('Exttest: ' + this.evaluate(function() {*/
            /*return Ext.getCmp("signInButton").doFireEvent('tap');*/
            /*}), 'INFO');*/
/*if (casper.page.injectJs('lib/sencha-touch-all-debug.js')) {*/
        casper.evaluate(function() {
			return Ext.getCmp("signInButton").doFireEvent('tap');
        });
    /*}*/
	});

	this.waitFor(function check() {
		return this.evaluate(function() {
			return (this.getCurrentUrl() !== HOST);
		});
	},
	function then() { // step to execute when check() is ok
		console.log('clicked ok, new location is ' + this.getCurrentUrl());
		this.capture('3.png');
	},
	function timeout() { // step to execute if check has failed
		console.log('failed to load a new page');
		this.capture('3.png');
	});

	/*this.test.assertUrlMatch(/^http:\/\/twitter.com\/oauth\/authenticate/, 'Opened twitter oauth');*/
	/*this.test.assertUrlMatch(/^http:\/\/lanyrd.com\/calendar\/$/, 'Redirected to lanyrd calendar');*/
	/*this.test.assertExists(".account-details a", "Found username link");*/
	/*this.test.assertMatch( this.fetchText(".account-details a"), /lanyrdtest/, "Username shown - login successful" );*/
});

casper.run(function() { 
    this.exit();
});

casper.clear();
