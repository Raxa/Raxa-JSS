/*
 * This screen shows a list of patients on the left side,
 * with a button to sort them. The right side shows a drug order    *  form
 */

Ext.define("Screener.view.PharmacyView", {
	extend: 'Ext.Container',
	id: 'pharmacyView',

requires : [ 'Screener.view.Pharmacyform' ],
      
	xtype: 'pharmacylist',

	config: {
		fullscreen: true,
		layout: 'hbox',
		title: 'Patient Assignments',
		items: [
		        
		        //our patient list is built on the Patients store, and has a title and sort button
		        {	            	
		        	xtype: 'list', 
		        	id: 'patientList',

		        	itemTpl: '{lastname}, {firstname}',
		        	store: Ext.create('Screener.store.Patients',{
		        		storeId: 'patientStore'

		        	}),

		        	items:[{
		        		xtype: 'titlebar',
		        		docked: 'top',
		        		title: 'Patients',
		        		items:[{
		        			xtype: 'button',
		        			text: 'Sort',
		        			id: 'sortButton',
		        			align: 'left'
		        		}]
		        	}],
		        	flex:1

		        },


             {xtype : 'pharmacyform',
		
             flex:1


             }
		        ]
	}

});


