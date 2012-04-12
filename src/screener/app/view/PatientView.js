/*
 * This screen shows a list of patients on the left side,
 * with a button to sort them. The right side shows available
 * doctors, with an assign button on top to give a patient to
 * a doctor.
 */

Ext.define("Screener.view.PatientView", {
	extend: 'Ext.Container',
	xtype: 'patientList',
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
		        	flex:1,


		        },
		        
		      //our doctor list is built on the Doctors store, and has a title and assign button
		        {  
		        	xtype: 'list', 
		        	id: 'doctorList',

		        	itemTpl: '({numpatients})Dr. {firstname} {lastname}',
		        	store: Ext.create('Screener.store.Doctors', {
		        		storeId: 'doctorStore'
		        	}),
		        	items:[{
		        		xtype: 'titlebar',
		        		docked: 'top',
		        		title: 'Doctors',
		        		items:[{
		        			xtype: 'button',
		        			id: 'assignButton',
		        			text: 'ASSIGN',
		        			align: 'left',
		        			disabled: 'true',
		        		}],
		        	}],  
		        	flex:1,
		        }
		        ]
	}

});


