Ext.define('Registration.controller.controls', {
    extend: 'Ext.app.Controller',
    views : ['RegistrationPart1','RegistrationPart2','Home','Viewport','ConfirmationScreen'],
    stores: ['obsstore', 'encounterstore'],
    models: ['obsmodel', 'encountermodel'],
    
    init : function()
    {
        this.control({
            'home button[action=test]': {
                click: this.senddata
            }
        })
    },
    // for now the function is called when the emergency button is pressed since the views were not completed
    
    /*creates the json object of the encounter needed to be passed to the server and sends it to the server to post the record*/
    senddata: function(button){
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
        var location ="JSS";
        var form = "57590a41-aed7-11e1-9102-963e738646cc";
        var provider1 = "";
        var orders1 = "";
        // the variable sabove are hard coded...will get them from somewhere else
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
        jsonencounter.data.obs = [];
        //get the values of each obs from the bmi or registration field
        var height = 178;
        if(height != 0){
            var jsonencounterheight = Ext.create('Registration.model.obsmodel',{
                obsDatetime : ISODateString(currentDate),
                person: "5793225b-aed7-11e1-9102-963e738646cc",
                concept: localStorage.heightUuidconcept,
                value: height
            });
            jsonencounter.data.obs.push(jsonencounterheight.data);
        }
        var weight = 54.5;
        if(weight != 0){
            var jsonencounterweight = Ext.create('Registration.model.obsmodel',{
                obsDatetime : ISODateString(currentDate),
                person: "5793225b-aed7-11e1-9102-963e738646cc",
                concept: localStorage.weightUuidconcept,
                value: weight
            });
            jsonencounter.data.obs.push(jsonencounterweight.data);
        }
        var bmi = 17.7;
        if(bmi != 0){
            var jsonencounterbmi = Ext.create('Registration.model.obsmodel',{
                obsDatetime : ISODateString(currentDate),
                person: "5793225b-aed7-11e1-9102-963e738646cc",
                concept: localStorage.bmiUuidconcept,
                value: bmi
            });
            jsonencounter.data.obs.push(jsonencounterbmi.data);
        }
        var regfee = 17.7;
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