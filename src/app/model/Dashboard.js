Ext.regModel('Dashboard', {
    fields: [
        {name: 'record1', type: 'string'},
        {name: 'record2', type: 'string'}
        
    ]
});

var myStore = new Ext.data.Store({
    model: 'Dashboard',
    storeId: 'dashboardStore',	
    autoLoad: true,
    data : [
        {record1: 'Registration', record2: 'Laboratory'},
	{record1: 'OPD', record2: 'Test'}  
    ] 	
});
