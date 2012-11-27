/**
 * Startup class is called before login. Startup class checks for new views
 * that have been added and POSTs them to the server
 */
var Startup = {

    /**
     * Helper function to add to xml response, when we get an app.js file,
     * look for all the views declared
     * When all GET calls received, returns control to RaxaEmr.controller.Session
     * @param getRequest: receives ajax request
     * @param views: storing all the views as a string
     * @param module: the raxa module
     * @return the function to call when we receive the app.js file
     */
    getViewRequestHandler: function (getRequest, views, module) {
        //we return an error code (for Jasmine testing)
        errCode = 'noErrors';
        //decrement calls left if we received a response from server
        getCallsLeft--;
        // if we have received GET response success, find views
        // first, get the line in app.js that defines views
        str = getRequest.responseText.match(/views:[\s\S]*?\]/g);
        // if we have views defined in our file, extract all views
        if (str) {
            viewStrings = str[0].substring(5).match(/\b(\w)+\b/g);
            for (j = 0; j < viewStrings.length; j++) {
                currIndex = views.length;
                views[currIndex] = [];
                views[currIndex][0] = 'RaxaEmrView '+module + ' ' + viewStrings[j];
                if(module == 'login'){
                    views[currIndex][1] = '#' + viewStrings[j];
                }
                else{
                    views[currIndex][1] = module+'/#' + viewStrings[j];
                }
            }
        }
        // if no views are defined in current app.js, return error string
        else {
            errCode = 'noViewsDefined';
            console.log(module + ' does not define any views');
        }

        return errCode;
    },
    
    
    getResourceUuid: function() {
        console.log("getResourceUuid");
        var x;
        Ext.Ajax.request({
            url : HOST+'/ws/rest/v1/concept?q=height',
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) {
                console.log('GET failed with response status: '+ response.status); // + response.status);
            },
            success: function (response) {
                for(var i=0;i<JSON.parse(response.responseText).results.length;++i){
                    if(JSON.parse(response.responseText).results[i].display == 'HEIGHT (CM)'){
                        x = JSON.parse(response.responseText).results[i].uuid
                    }
                }
                if(x != localStorage.heightUuidconcept || localStorage.heightUuidconcept == undefined){

                    for (k in resourceUuid)
                    {
                        var res = resourceUuid[k];
                        Util.getAttributeFromREST(res.resource, res.queryTerm, res.varName, res.displayName);
                    }
                }
            }
        });
    },
    /**
     * for each of the modules defined in Util.getModules(), create a GET
     * request and send to server for the app/app.js file
     * @param currModuleAddr: the relative address for the current module
     * @param module: the name of the current module
     * @param views: 2-d array for storing view names+URLs
     * @param callback: function to be called after AJAX is done
     */
    createViewGetRequest: function (currModuleAddr, module, views, callback) {
        Ext.Ajax.request({
            url: currModuleAddr + '/app/app.js',
            method: 'GET',
            success: function (response) {
                Startup.getViewRequestHandler(response, views, module);
                if (getCallsLeft === 0) {
                    Startup.postPrivilege(views,callback);
                }
            },
            failure: function (response) {
                // if we don't have GET response success, return error string
                console.log(module + ' does not have app/app.js file');
                getCallsLeft--;
                if (getCallsLeft === 0) {
                    Startup.postPrivilege(views,callback);
                }
            }
        });
    },

    /**
     * Calls back into RaxaEmr.controller with a 2-d array of view urls
     * Uses getModules array, searches all the modules' app.js files for views
     * views has [x][0] = 'name', [x][1] = 'url'
     * Example: views[8][0] = 'login Dashboard', views[8][1] = "login/#Dashboard"
     * @param modules: all the current modules of raxa
     * @param callback: function to be called after AJAX GETs are finished, 
     * the callback function should take in views as parameter
     */
    populateViews: function (modules, callback) {
        //2-d array of view names + urls
        views = [];
        //keeping track of how many GETs left to receive
        getCallsLeft = modules.length;
        //adding url for home page (relative URL is blank)
        views[0] = [];
        views[0][0] = 'RaxaEmrView home Page';
        views[0][1] = './';
        currModuleAddr = '';
        for (i = 0; i < modules.length; i++) {
            if (i === 0) {
                currModuleAddr = '.'
            } else {
                currModuleAddr = modules[i];
                //adding url for bare app i.e. screener/index.html
                currIndex = views.length;
                views[currIndex] = [];
                views[currIndex][0] = 'RaxaEmrView '+modules[i];
                views[currIndex][1] = modules[i];
            }
            //create AJAX get request for each app/app.js file
            Startup.createViewGetRequest(currModuleAddr, modules[i], views, callback);
        }
    },
    
    intervalFn: null,
    uuidLoadAttempts: 0,
    uuidLoading: function(){
        var MAX_LOAD_ATTEMPTS = 10;
        var that = this;
        Ext.getCmp('mainView').setMasked({
            xtype: 'loadmask',
            message: 'Loading'
        });

        if( ! Util.checkAllUuidsLoaded() ) {
            uuidLoadAttempts++;
            console.log("Loading UUIDs... # attempts = " + uuidLoadAttempts + " of " + MAX_LOAD_ATTEMPTS);
        }
        else {
            that.removeTimer();
            Ext.getCmp('mainView').setMasked(false);
        }
        
        if ( uuidLoadAttempts === MAX_LOAD_ATTEMPTS){
            that.removeTimer();
            Ext.getCmp('mainView').setMasked(false);
            Ext.Msg.alert("","Unable to load all UUIDs from OpenMRS.");
            Util.logoutUser();
        }
    },
             
    repeatUuidLoadingEverySec: function()
    {
        uuidLoadAttempts=0; // Without this compiler is giving error
        var that = this;
        intervalFn = setInterval(function(){
            that.uuidLoading();
        },1000);
    },
    

    removeTimer: function()
    {
        clearInterval(intervalFn);
    },

    /**
     * POST the passed views to the REST services on HOST using AJAX Request
     * @param views: 2-d array for storing view names+URLs
     * @param callback: function to be called after AJAX GETs are finished, 
     */
    postPrivilege: function (views, callback) {
        //Counts the successful POST AJAX Calls
        postSuccessCount = 0;

        //create POST call for all views repeatedly
        for (i = 0; i < views.length; i++) {
            //Copies names & URL to json Object
            var jsonPriviledge = {
                "name": views[i][0],
                "description": views[i][1]
            };

            //Ajax Request to POST json Object containing name+URL
            Ext.Ajax.request({
                url: HOST + '/ws/rest/v1/privilege',
                method: 'POST',
                disableCaching: false,
                jsonData: jsonPriviledge,
                headers: Util.getBasicAuthHeaders(),

                failure: function (response) {
                    console.log('Privilege POST failed with response status ' + response.status);
                },

                success: function (response) {
                    postSuccessCount++;
                    //if all POST calls are successful, callback method is called
                    if (postSuccessCount == (views.length - 1)) {
                        console.log('All ' + postSuccessCount + ' views POST successful');
                        callback(views);
                    }
                }
            });
        }
    }
}
