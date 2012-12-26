/* model for drug orders GET call*/
Ext.define('RaxaEmr.Pharmacy.model.drugOrderSearch', {
    extend: 'Ext.data.Model',
    fields: [
    {
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    },
    {
        name : 'drugname',
        type: 'string',
        mapping: 'drug.name'
    },
    {
        name : 'drugUuid',
        type: 'string',
        mapping: 'drug.uuid'
    }, {
        name: 'dosage',
        type: 'string',
        mapping: 'dose'
    },{
        name: 'startDate',
        type : 'date',
        mapping: 'startDate'
    },
    {
        name: 'date',
        type : 'date',
        mapping: 'startDate',
        convert: function (value, record) {
            //Convert date type that .NET can bind to DateTime
            console.log("<<<<<<<<<<for start date >>>>>>>>>>>>");
            console.log(value);
            console.log(record);
            var date = value.split("T");
            //var date = new Date(parseInt(value.substr(6)));
            //console.log(value.substr(6));
            //console.log(parseInt(value.substr(6)));
            console.log(date);
            console.log(date[0]);
            //console.log(Ext.Date.format(date, 'l, F d, Y '));
            //return Ext.Date.format(date, 'l, F d, Y '); //Full Date Time
            return date[0];    
    }
    }, {
        name: 'endDate',
        type: 'date',
        mapping: 'autoExpireDate'
    }, {
        name: 'quantity',
        type: 'number'
    }, {
        name: 'frequency',
        type: 'string'
    }, {
        name: 'unitPrice',
        type: 'number'
    }, {
        name: 'ItemPrice',
        type: 'number'
    }, 
    {
        name: 'instructions',
        type: 'string'
    }
    ]
})


