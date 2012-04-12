/*
 * This panel will overlay when the new patient button is
 * pressed. This is a form that gets user name and shows
 * FIFO id for queueing
 */
Ext.define("Screener.view.NewPatient", {
	requires: [ 'Ext.field.Text',
	             'Ext.field.Number'],
	extend: 'Ext.form.Panel',
	xtype: 'newPatient',
	config: {
		centered: true,
		modal: true,
		hideOnMaskTap: true,
		hidden: true,
		// Set the width and height of the panel
		width: Ext.os.is.Phone ? 260 : 400,
		height: 200,

				items: [
				        {
				        	xtype: 'textfield',
				        	name: 'firstname',
				        	label: 'First Name',
				        },
				        {
				        	xtype: 'textfield',
				        	name: 'lastname',
				        	label: 'Last Name',
				        },
				        {
				        	xtype: 'numberfield',
				        	id: 'formid',
				            name: 'id',
				            label: 'FIFO ID',
				        },
				        {
				        	xtype: 'button',
				        	id: 'savePatientButton',
				        	text: 'Save',
				        	ui: 'action'

				        }
				        ]
	},
	saveForm: function(){
		return this.getValues();
	}

});
