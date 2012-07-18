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
			itemTpl: '{display}<br>Gender: {gender} Age: {age}<br>BMI: {bmi} ',
            store:  'patientStore',
            items: [{
                xtype: 'titlebar',
				itemId: 'patientsWaiting',
                docked: 'top',
                title: 'Patients',
                items: [{
                    xtype: 'button',
                    text: 'BMI',
					itemId: 'sortBMI',
					action: 'sortByBMI',
                    align: 'left'
                },{
                    xtype: 'button',
                    text: 'FIFO',
					itemId: 'sortFIFO',
					action: 'sortByFIFO',
                    align: 'left'
                },{
                    xtype: 'button',
                    text: 'Name',
					itemId: 'sortName',
					action: 'sortByName',
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
