/**
 * This screen shows a list of patients 
 */
Ext.define("Screener.view.PatientListView", {
    xtype: 'patientListView',
	extend: 'Ext.Container',
	alias: 'widget.ListView',
	
	
    config: {
        layout: 'hbox',
        title: 'Patient Assignments',
		
        items: [
        //our patient list is built on the Patients store, and has a title and sort button
        {
            xtype: 'list',
            itemId: 'patientList',
			itemTpl: '{display}',
            store:  'patientStore',
            items: [{
                xtype: 'titlebar',
				itemId: 'patientsWaiting',
                docked: 'top',
                title: 'Patients',
                items: [{
                    xtype: 'button',
                    text: 'Sort',
					action: 'sortList',
                    align: 'left'
                },{
					xtype: 'button',
                    text: 'Refresh',
                    itemId: 'refreshButton',
					action: 'refreshList',
					align: 'right'
				}]
            }],
			flex: 1,
        }]
    },
});
