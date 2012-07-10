/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * This class provides util methods that are shared by the core, apps and modules
 */

if (localStorage.getItem("host") == null) {
    var HOST = 'http://emrjss.jelastic.dogado.eu';
} else HOST = localStorage.getItem("host");
var username;
var password ;
var timeoutLimit = 20000;
var hospitalName = 'JSS Hospital';
var resourceUuid = [['concept','height','HEIGHT (CM)'],['concept','weight','WEIGHT (KG)'],['concept','bmi','BODY MASS INDEX'],['concept', 'regfee','Registration Fee'],
['form', 'basic','Basic Form - This form contains only the common/core elements needed for most forms'],['encountertype', 'reg','REGISTRATION - Registration encounter'],['encountertype', 'screener','SCREENER - Screener encounter'],
['location', 'screener','Screener Registration Disk - registration desk in a screener module'],['location', 'waiting','Waiting Patient: Screener - patients assigned to a doctor']];

//BMI WHO Constants
var WHO_BMI_VSUNDERWEIGHT = 15;
var WHO_BMI_SUNDERWEIGHT = 16;
var WHO_BMI_UNDERWEIGHT = 18.5;
var WHO_BMI_NORMAL = 25;
var WHO_BMI_OVERWEIGHT = 30;
var WHO_BMI_OBESE = 35;
var WHO_BMI_SOBESE = 40;
var BMI_MAX = 60;
var BMI_HEIGHT_MAX = 300;
var BMI_HEIGHT_MIN = 0;
var BMI_WEIGHT_MAX = 800;
var BMI_WEIGHT_MIN = 0;
var KEY= {
    ENTER : 13
};
// Enum for Registration Module Page Numbers
var REG_PAGES = {
    HOME: {
        value: 0,
        name: "home"
    },
    REG_1: {
        value: 1,
        name: "registrationpart1"
    },
    REG_2: {
        value: 2,
        name: "registrationpart2"
    },
    REG_CONFIRM: {
        value: 3,
        name: "registrationconfirm"
    },
    REG_BMI: {
        value: 4,
        name: "registrationbmi"
    },
    SEARCH_1: {
        value: 5,
        name: "searchpart1"
    },
    SEARCH_2: {
        value: 6,
        name: "searchpart2"
    },
    SEARCH_CONFIRM: {
        value: 7,
        name: "searchconfirm"
    }
};

var UITIME = 2000;
var Util = {
    /**
     *Returns the value of TimeoutLimit for login timeout 
     *@return timeoutLimit for timeout in login 
     */
    Datetime: function (d){
        function pad(n){
            return n<10 ? '0'+n : n
        }
        return d.getFullYear()+'-'
        + pad(d.getMonth()+1)+'-'
        + pad(d.getDate())+'T'
        + pad(d.getHours())+':'
        + pad(d.getMinutes())+':'
        + pad(d.getSeconds())+'Z'
    },
    startDatetime: function (d) {
        var MS_PER_MINUTE = 60000;
        var k = new Date(d - 1440 * MS_PER_MINUTE);

        function pad(n) {
            return n < 10 ? '0' + n : n
        }
        return k.getFullYear() + '-' 
		+ pad(k.getMonth() + 1) + '-' 
		+ pad(k.getDate()) + 'T' 
		+ pad(k.getHours()) + ':' 
		+ pad(k.getMinutes()) + ':' 
		+ pad(k.getSeconds()) + 'Z'
    },
    getTimeoutLimit: function () {
        return timeoutLimit;
    },
    
    getHospitalName: function () {
        return hospitalName;
    },

    getHospitalName: function () {
        return hospitalName;
    },

    /**
     * Returns all the headers required for Basic Authenticated REST calls
     * @return headers object that includes Authorization, Accept and Content-Type
     */
    getBasicAuthHeaders: function () {
        var headers = {
            "Authorization": localStorage.getItem("basicAuthHeader"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        return headers;
    },

    /**
     * Logout the current user. Ends the current session
     */
    logoutUser: function () {
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/session',
            withCredentials: true,
            useDefaultXhrHeader: false,
            method: 'DELETE',
            success: function () {
            // do nothing
            }
        });
    },

    /**
     * Saves the Basic Authentication header to Localstorage
     * Verifies if username + password is valid on server and saves as Base4 encoded string of user:pass
     */
    saveBasicAuthHeader: function (username, password) {
        Util.logoutUser(); //Delete existing logged in sessions
        //Check login and save to localStorage if valid
        var xmlReq = new XMLHttpRequest();
        xmlReq.open("GET", HOST + '/ws/rest/v1/session', false);
        xmlReq.setRequestHeader("Accept", "application/json");
        xmlReq.setRequestHeader("Authorization", "Basic " + window.btoa(username + ":" + password));
        xmlReq.send();
        if (xmlReq.status = "200") {
        var authenticated = Ext.decode(xmlReq.responseText).authenticated;
        if (authenticated) {
                    localStorage.setItem("basicAuthHeader", "Basic " + window.btoa(username + ":" + password));
                } else {
                    localStorage.removeItem("basicAuthHeader");
                }
        }            
    },

    /**
     * Returns all the modules in Raxa
     * @return [ 'login', 'screener', ....]
     */
    getModules: function () {
        //always keep login at first position as its app path is different
         return ['login', 'screener', 'registration', 'registrationextjs4', 'pharmacy', 'chw', 'outpatient'];
    //TO DO:Add the line below instead the above one 
    //return ['login', 'screener', 'registration','opd','inpatient','pharmacy','radiology','laboratory','billing'];
    },

    getApps: function () {
        //always keep login at first position as its app path is different
        return ['gotStatins','problemList'];
    //TO DO:Add the line below instead the above one 
    //return ['login', 'screener', 'registration','opd','inpatient','pharmacy','radiology','laboratory','billing'];
    },
    /**
     *Generate six digit randomly generated Device Id  
     *Checks if any key with name "deviceId" is previously stored in localStorage, returns it if availaible
     *@return deviceId
     *
     */
    getDeviceId: function () {
        var deviceId;
        //Checks if localStorage already has deviceId stored in it        
        if (localStorage.getItem("deviceId") == null) {
            var randomNumber = [];
            for (var i = 0; i < 6; i++) {
                //generates random digit from 0 to 10
                randomNumber[i] = (Math.floor(Math.random() * 10));
            }
            deviceId = randomNumber.join('');
            localStorage.setItem("deviceId", deviceId);
            console.log('6-digit randomly generated Device Id: ' + deviceId + ' & is stored in localStorage');

        } else {
            // gets the value of deviceId if available in localStorage 
            deviceId = localStorage.getItem("deviceId");
            console.log('6-digit randomly generated Device Id that was stored in localStorage:' + deviceId);
        }
        return deviceId;
    },

    getPatientIdentifier: function () {
        //dummy funtion to be used for creating partient
        // TODO: writen a  ramdom no for patient identufier but it should be a unique id
        return Math.floor(Math.random() * 1000000000);
    },
    //Function to help share Models between ExtJS and Sencha Touch 2.
    platformizeModelConfig: function (extJsModelConfig) {
        if (Ext.versions.extjs) {
            return extJsModelConfig; // nothing to change, we are on ext
        } else if (Ext.versions.touch) {
            // transform to Sencha Touch 2 data model
            var config = {
                extend: extJsModelConfig.extend,
                config: extJsModelConfig
            };
            delete config.config.extend;
            return config;
        } else {
            Ext.Error.raise('Could not recognize Library');
        }
    },
    
    getAttributeFromREST : function(resource,queryParameter,display) {

        //Ajax Request to get Height / Weight / Bmi Attribiutes from Concept Resource
        Ext.Ajax.request({
            url : HOST+'/ws/rest/v1/'+resource+'?q='+queryParameter,  //'/ws/rest/v1/concept?q=height',
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) {
                console.log('GET failed with response status: '+ response.status); // + response.status);
            },
            success: function (response) {
                for(var i=0;i<JSON.parse(response.responseText).results.length;++i){
                    if(JSON.parse(response.responseText).results[i].display == display){
                        if(resource != 'location'){
                            localStorage.setItem(queryParameter+"Uuid"+resource,JSON.parse(response.responseText).results[i].uuid)
                        }
                        else{console.log
                            localStorage.setItem(queryParameter+"Uuid"+resource,display)
                        }
                    }
                }
            }
        });
    },
    
    getProviderUuid : function(uuid) {
        //Ajax Request to get Height / Weight / Bmi Attribiutes from Concept Resource
        Ext.Ajax.request({
            url : HOST+'/ws/rest/v1/provider/'+uuid,  //'/ws/rest/v1/concept?q=height',
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) {
                console.log('GET failed with response status: '+ response.status); // + response.status);
            },
            success: function (response) {
                var x = "person not exits"
                if(console.log(JSON.parse(response.responseText).person.uuid) != null){
                    return JSON.parse(response.responseText).person.uuid
                }
                else{
                    return x
                }
            }
        });
    }
}


if (localStorage.heightUuidconcept == undefined) {
    var heightUuidConcept = Util.getAttributeFromREST('concept', 'height', 'HEIGHT (CM)');
}
if (localStorage.weightUuidconcept == undefined) {
    var weightUuidConcept = Util.getAttributeFromREST('concept', 'weight', 'WEIGHT (KG)');
}
if (localStorage.bmiUuidconcept == undefined) {
    var bmiUuidConcept = Util.getAttributeFromREST('concept', 'bmi', 'BODY MASS INDEX');
}
if (localStorage.regfeeUuidconcept == undefined) {
    var regfeeUuidConcept = Util.getAttributeFromREST('concept', 'regfee', 'Registration Fee');
}
if (localStorage.basicUuidform == undefined) {
    var basicUuidform = Util.getAttributeFromREST('form', 'basic', 'Basic Form - This form contains only the common/core elements needed for most forms');
}
if(localStorage.prescriptionUuidencountertype == undefined){ 
	var prescriptionUuidencountertype = Util.getAttributeFromREST('encountertype', 'prescription','PRESCRIPTION - Patient receives a drug prescription.');
}

