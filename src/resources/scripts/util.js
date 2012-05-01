/* 
 * This class provides util methods that are shared by the core, apps and modules
 */

//constant for storing all the modules
MODULES = ['login', 'screener', 'registration', 'registrationextjs4'];

var Util = {
    /**
     * Returns the Basic Authentication header that is a Base64 encoded string of user:pass
     * @return Authorization: Basic xxxx
     */
    getBasicAuthHeader: function(username, password){
        return "Authorization: Basic " + window.btoa(username+":"+password);
    },
    
    /**
     * Returns the Accept type header for JSON as a string
     * @return Accept: application/json
     */
    getJsonAcceptType: function(){
        return "Accept: application/json";
    },
    
    /**
     * Returns the Content-Type type for JSON header as a string
     * @return Content-Type: application/json
     */
    getJsonContentType: function(){
        return "Content-Type: application/json";
    },
    
    /**
     * Helper function to add to xml response, when we get an app.js file,
     * look for all the views declared
     * When all GET calls received, returns control to RaxaEmr.controller.Session
     * @param {} i: index of the current xml request
     * @param {} views: storing all the views as a string
     * @return {} the function to call when we receive the app.js file
     */
    getViewRequestHandler: function(i, views){
        return function(){
            //if we have received our GET response, decrement number of calls
        	//still left to receive
    		if(getRequests[i].readyState===4){
    			getCallsLeft--;
    			//if we have received GET response success, find views
    			if(getRequests[i].status===200){
                    //first, get the line in app.js that defines views
                    str = getRequests[i].responseText.match(/views:[\s\S]*?\]/g);
                    //if we have views defined in our file, extract all views
                    if(str){
                        viewStrings = str[0].substring(5).match(/\b(\w)+\b/g);
                        j=0;
                        for(;j<viewStrings.length;j++){
                            currIndex = views.length;
                            views[currIndex]=[];
                            views[currIndex][0] = MODULES[i]+' '+viewStrings[j];
                            views[currIndex][1] = MODULES[i]+'/#'+viewStrings[j];
                        }
                    }                    
                }
    		}
    		//if we have received all our GET calls, return controll to sencha MVC
            if(getCallsLeft===0){
                RaxaEmr.controller.Session.prototype.launchAfterAJAX(views);
            }
        }
    },
    
    /**
     * Calls back into RaxaEmr.controller with a 2-d array of view urls
     * Uses MODULES constant, searches all the app.js files for views
     * views has [x][0] = 'name', [x][1] = 'url'
     * Example: views[8][0] = 'login Dashboard', views[8][1] = "login/#Dashboard"
     */
    getViews: function(){
    	//2-d array of view names + urls
        views = [];
        //storing all our AJAX calls
        getRequests = [];
        //keeping track of how many GETs left to receive
        getCallsLeft = MODULES.length;
        //adding url for base, will be blank as this is our home page
        views[0]=[];
        views[0][0] = 'home Page';
        views[0][1] = '';
        currModuleAddr = '';
        if (window.XMLHttpRequest){
            for(i=0;i<MODULES.length;i++){            	
            	if(i===0){
            		currModuleAddr = '../src'
            	}
            	else{
            		currModuleAddr = MODULES[i];
            		//adding url for bare app i.e. screener/index.html
                    currIndex = views.length;
                    views[currIndex]=[];
                    views[currIndex][0] = MODULES[i];
                    views[currIndex][1] = MODULES[i];
            	}
                getRequests[i] = new XMLHttpRequest();
                getRequests[i].onreadystatechange = Util.getViewRequestHandler(i, views);
                //assumes all our views are defined in app.js
                getRequests[i].open("GET", currModuleAddr+'/app/app.js', true);
                getRequests[i].send();
            }
    	}
    }
}