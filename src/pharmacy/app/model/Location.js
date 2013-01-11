Ext.define('RaxaEmr.Pharmacy.model.Location', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    }, {
        name: 'name',
        type: 'string'
    },{
        name: 'uuid',
        type: 'string',
        persist: false
    },{
        name: 'tags',
        model: 'RaxaEmr.Pharmacy.model.LocationTag'
    },{
        name: 'tagName',
        mapping: 'tags.display'
    }],
    hasTag: function(tag){
        for(i=0; i< this.get("tags").length; i++)
            if(tag===this.get("tags")[i].name){
                return true;
            }
        return false;
    }
});

