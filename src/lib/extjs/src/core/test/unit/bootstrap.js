/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
(function() {
    var rootPath =  '../../../../extjs/', 
        bootstrap;

    bootstrap = this.ExtBootstrap = {
        rootPath: rootPath,

        disableCaching: window.location.search.match('(\\?|&)disableCacheBuster=true') === null,
        
        cacheBuster: function() {
            return ((this.disableCaching) ? ('?' + (new Date()).getTime()) : '');
        },
        
        loadScript: function(path) {
            document.write('<script type="text/javascript" src="' + rootPath + path + this.cacheBuster() + '"></script>');
        },
                
        loadSpecs: function(callback) {
            ExtBootstrap.afterAllSpecsAreLoaded = callback;
            ExtBootstrap.pendingSpecs = 0;
            ExtBootstrap.loadedSpecs = 0;
            Ext.Array.each(ExtSpecs, function(spec) {
                ExtBootstrap.pendingSpecs++;
                Ext.Loader.injectScriptElement(spec + ExtBootstrap.cacheBuster(), ExtBootstrap.afterSpecLoad, ExtBootstrap.afterSpecLoad, ExtBootstrap);
            });
        },
        
        afterSpecLoad: function() {
            ExtBootstrap.loadedSpecs++;
            if (ExtBootstrap.loadedSpecs == ExtBootstrap.pendingSpecs) {
                ExtBootstrap.afterAllSpecsAreLoaded();
            }
        }
    };
    
    bootstrap.loadScript('../testreporter/deploy/testreporter/jasmine.js');
    bootstrap.loadScript('../platform/core/test/unit/data.js');
    bootstrap.loadScript('bootstrap/data.js');
    bootstrap.loadScript('bootstrap/core.js');
})();


