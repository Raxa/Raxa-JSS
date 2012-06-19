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
 * This script initiates the registration module
 */ 

Ext.define('Registration.controller.controls', {
    extend: 'Ext.app.Controller',
    views: ['Viewport', 'Home', 'RegistrationPart1', 'RegistrationPart2', 'RegistrationConfirm', 'RegistrationBMI',
    'SearchPart1', 'SearchPart2', 'SearchConfirm'],
    stores: ['obsstore', 'encounterstore', 'orderstore', 'providerstore'],
    models: ['obsmodel', 'encountermodel', 'ordermodel', 'providermodel'],
    
    init : function()
    {
        this.control({
            'registrationbmi button[action=bmiSubmit]': {
                click: this.senddata
            }
        })
    },
    // for now the function is called when the emergency button is pressed since the views were not completed
    
    /*creates the json object of the encounter needed to be passed to the server and sends it to the server to post the record*/
    senddata: function(){
        //funciton to get the date in required format of the openMRS, since the default extjs4 format is not accepted
        function ISODateString(d){
            function pad(n){
                return n<10 ? '0'+n : n
            }
            return d.getUTCFullYear()+'-'
            + pad(d.getUTCMonth()+1)+'-'
            + pad(d.getUTCDate())+'T'
            + pad(d.getUTCHours())+':'
            + pad(d.getUTCMinutes())+':'
            + pad(d.getUTCSeconds())+'Z'
        }
        var currentDate = new Date();
        // creates the encounter json object
        var jsonencounter = Ext.create('Registration.model.encountermodel',{
            encounterDatetime : ISODateString(currentDate),
            patient: "5793225b-aed7-11e1-9102-963e738646cc",//you will get the uuid from ticket 144...pass it here
            encounterType: "e7ebaec1-d6b9-4f9f-aba4-3313efd835c5"//need to pass the type depending on the type of encounter
        });
        // the 3 fields "encounterDatetime, patient, encounterType" are obligatory fields rest are optional
        var location ="Registration Desk";
        var form = "57590a41-aed7-11e1-9102-963e738646cc";
        var provider1 = "";
        var orders1 = "";
        jsonencounter.data.obs = [];
        jsonencounter.data.provider = [];
        jsonencounter.data.orders = [];
        // the variables above are hard coded...will get them from somewhere else
        // the if statement is to check whether the field is null or not..persist false does not pass that field details into the server. this is done to avoid 500 error
        if(location != ""){
            jsonencounter.data.location = location;
            Registration.model.encountermodel.getFields()[3].persist = true;
        }
        else{
            Registration.model.encountermodel.getFields()[3].persist = false;
        }
        if(form != ""){
            jsonencounter.data.form = form;
            Registration.model.encountermodel.getFields()[4].persist = true;
        }
        else{
            Registration.model.encountermodel.getFields()[4].persist = false;
        }
        if(provider1 != ""){
            jsonencounter.data.provider = provider1;
            Registration.model.encountermodel.getFields()[5].persist = true;
        //should create an instance of the provider model and push it to the empthy array created...for example see the height instance in obs
        }
        else{
            Registration.model.encountermodel.getFields()[5].persist = false;
        }
        if(orders1 != ""){
            jsonencounter.data.orders = orders1;
            Registration.model.encountermodel.getFields()[6].persist = true;
        }
        else{
            Registration.model.encountermodel.getFields()[6].persist = false;
        }
        
        if((Ext.getCmp('heightIDcm').isValid() && Ext.getCmp('heightIDcm').value != null)||(Ext.getCmp('weightIDkg').isValid() && Ext.getCmp('weightIDkg').value != null)||(Ext.getCmp('bmiNumberfieldID').isValid() && Ext.getCmp('bmiNumberfieldID').value != null)||(regfee != 0))
        {
            Registration.model.encountermodel.getFields()[7].persist = true;
        }
        else{
            Registration.model.encountermodel.getFields()[7].persist = false;
        }
        //get the values of each obs from the bmi or registration field
        if(Ext.getCmp('heightIDcm').isValid() && Ext.getCmp('heightIDcm').value != null){
            var jsonencounterheight = Ext.create('Registration.model.obsmodel',{
                obsDatetime : ISODateString(currentDate),
                person: "5793225b-aed7-11e1-9102-963e738646cc",
                concept: localStorage.heightUuidconcept,
                value: parseInt(Ext.getCmp('heightIDcm').getValue())
            });
            jsonencounter.data.obs.push(jsonencounterheight.data);
        }
        if(Ext.getCmp('weightIDkg').isValid() && Ext.getCmp('weightIDkg').value != null){
            var jsonencounterweight = Ext.create('Registration.model.obsmodel',{
                obsDatetime : ISODateString(currentDate),
                person: "5793225b-aed7-11e1-9102-963e738646cc",
                concept: localStorage.weightUuidconcept,
                value: parseFloat(Ext.getCmp('weightIDkg').getValue())
            });
            jsonencounter.data.obs.push(jsonencounterweight.data);
        }
        if(Ext.getCmp('bmiNumberfieldID').isValid() && Ext.getCmp('bmiNumberfieldID').value != null){
            var jsonencounterbmi = Ext.create('Registration.model.obsmodel',{
                obsDatetime : ISODateString(currentDate),
                person: "5793225b-aed7-11e1-9102-963e738646cc",
                concept: localStorage.bmiUuidconcept,
                value: parseFloat(Ext.getCmp('bmiNumberfieldID').getValue())
            });
            jsonencounter.data.obs.push(jsonencounterbmi.data);
        }
        var regfee = 250;
        if(regfee != 0){
            var jsonencounterregfee = Ext.create('Registration.model.obsmodel',{
                obsDatetime : ISODateString(currentDate),
                person: "5793225b-aed7-11e1-9102-963e738646cc",
                concept: localStorage.regfeeUuidconcept,
                value: regfee
            });
            jsonencounter.data.obs.push(jsonencounterregfee.data);
        }
        var store = Ext.create('Registration.store.encounterstore');
        store.add(jsonencounter);
        store.sync();
        return store;
    }
});