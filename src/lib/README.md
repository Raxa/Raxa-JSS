Installing Sencha Touch
-----------------------

*Using Sencha Touch 2 beta 1. Removed the docs and examples folder to reduce codebase size. These can be viewed online.*

Download the Sencha Touch SDK from [here](http://www.sencha.com/products/touch/download/) and place (or symlink) the unzipped directory, renamed to <code>touch</code>, into the <code>lib</code> folder.

This should ensure that the <code>&lt;link&gt;</code> and <code>&lt;script&gt;</code> tags in the <code>index.html</code> of the application itself point to the correct locations for the JavaScript and CSS resources:

    <script src="lib/touch/sencha-touch.js" type="text/javascript"></script>
    <link  href="lib/touch/resources/css/sencha-touch.css" rel="stylesheet" type="text/css" />

You should then be able to test that the application works by opening the <code>index.html</code> file in a WebKit desktop browser. To try the application on a mobile simulator (or real handset), you will have to deploy this directory onto a local (or external) web server.