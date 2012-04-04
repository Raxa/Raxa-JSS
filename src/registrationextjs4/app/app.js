
Ext.require([
	'Ext.tab.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
	'Ext.form.*',
]);

Ext.onReady(function(){

	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	
    var tabs = Ext.createWidget('viewport', {
        renderTo: Ext.getBody(),
		layout: {
			align: 'stretch',
			pack: 'center',
			type: 'hbox'
		},
		items: [
		{
			xtype: 'panel',
			width: 800,
			border: 0,
			layout: {
				type: 'border'
			},
			items: [
				{
					xtype: 'panel',
					id: 'mainregarea',
					activeItem: 0,
					layout: {
						type: 'card'
					},
					tbar:
					{
						xtype: 'toolbar',
						height: 40,
						dock: 'top',
						items: [
							{
								xtype: 'image',
								height: 35,
								width: 40,
								src: '../resources/img/icon.png'
							},
							{
								xtype: 'tbfill'
							},
							{
								xtype: 'button',
								width: 60,
								text: 'Help'
							},
							{
								xtype: 'tbseparator'
							},
							{
								xtype: 'button',
								text: 'Preferences'
							},
							{
								xtype: 'tbseparator'
							},
							{
								xtype: 'tbtext',
								text: 'Vikas Singh'
							},
							{
								xtype: 'tbseparator'
							},
							{
								xtype: 'button',
								width: 60,
								text: 'Sign Out'
							}
						]
					},
					bbar:
					{
						xtype: 'toolbar',
						height: 40,
						dock: 'top',
						items: [
							{
								xtype: 'tbspacer',
								width: 380
							},
							{
								xtype: 'image',
								height: 35,
								width: 40,
								src: '../resources/img/icon.png'
							}
						]
					},
					margin: '2 0 2 0',
					region: 'center',
					items: [
						{
							xtype: 'panel',
							border: 0,
							layout: {
								type: 'fit'
							},
							items: [
								{
									xtype: 'form',
									border: 0,
									height: 347,
									layout: {
										align: 'center',
										pack: 'center',
										type: 'vbox'
									},
									bodyPadding: 10,
									items: [
										{
											xtype: 'image',
											height: 130,
											margin: '0 0 20 0',
											width: 130,
											src: '../resources/img/logo.png'
										},
										{
											xtype: 'combobox',
											typeAhead: true,
											triggerAction: 'all',
											selectOnTab: true,
											store: [
												['vikas','vikas'],
												['anshu','anshu'],
												['nathan','nathan'],
												['mohit','mohit'],
												['daniel','daniel'],
												['akash','akash'],
												['ankit','ankit'],
												['suraj','suraj'],
												['subodh','subodh'],
												['ashwini','ashwini']
											],
											lazyRender: true,
											listClass: 'x-combo-list-small',
											fieldLabel: 'Search Patient',
											labelAlign: 'top',
											width: 300,
											hideTrigger: true
										},
										{
											xtype: 'button',
											height: 35,
											margin: '10 0 13 0',
											width: 300,
											text: 'Register New Patient',
											handler:function(){
														var l = Ext.getCmp('mainregarea').getLayout();
														l.setActiveItem(1);
											}
										},
										{
											xtype: 'button',
											height: 35,
											width: 300,
											text: 'Emergency'
										}
									]
								}
							]
						},
						{
							xtype: 'panel',
							border: 0,
							bodyPadding: 10,
							items: [
								{
									xtype: 'fieldset',
									padding: 10,
									title: 'New Patient Registration (Part 1)',
									fieldDefaults: {
										msgTarget: 'side'
									},
									items: [
										/*{
											xtype: 'textfield',
											fieldLabel: 'Self',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%',
											allowBlank:false
										},*/
										{
											xtype: 'fieldcontainer',
											fieldLabel: 'Self',
											layout: 'hbox',
											combineErrors: true,
											defaultType: 'textfield',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%',
											defaults: {
												hideLabel: 'true'
											},
											items: [{
												name: 'firstName',
												fieldLabel: 'First Name',
												flex: 1,
												emptyText: 'First Name',
												allowBlank: false
											},
											{
												name: 'middleName',
												fieldLabel: 'Middle Name',
												flex: 1,
												margins: '0 0 0 6',
												emptyText: 'Middle Name',
											},
											{
												name: 'lastName',
												fieldLabel: 'Last Name',
												flex: 1,
												margins: '0 0 0 6',
												emptyText: 'Last Name',
												allowBlank: false
											}]
										},
										{
											xtype: 'fieldcontainer',
											fieldLabel: 'Father/Husband',
											layout: 'hbox',
											combineErrors: true,
											defaultType: 'textfield',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%',
											defaults: {
												hideLabel: 'true'
											},
											items: [{
												name: 'firstName',
												fieldLabel: 'First Name',
												flex: 1,
												emptyText: 'First Name',
												allowBlank: false
											},
											{
												name: 'middleName',
												fieldLabel: 'Middle Name',
												flex: 1,
												margins: '0 0 0 6',
												emptyText: 'Middle Name',
											},
											{
												name: 'lastName',
												fieldLabel: 'Last Name',
												flex: 1,
												margins: '0 0 0 6',
												emptyText: 'Last Name',
												allowBlank: false
											}]
										},/*
										{
											xtype: 'textfield',
											fieldLabel: 'Father/Husband',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%',
											allowBlank:false
										},*/
										{
											xtype: 'textfield',
											fieldLabel: 'Village',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '75%',
											allowBlank:false
										},
										{
											xtype: 'textfield',
											fieldLabel: 'Occupation',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '75%',
											allowBlank:false
										},
										{
											xtype: 'numberfield',
											fieldLabel: 'Mobile/Phone Number',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											hideTrigger: true,
											anchor: '75%',
											allowBlank:false
										},
										{
											xtype: 'numberfield',
											fieldLabel: 'Family Card Number',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											hideTrigger: true,
											anchor: '75%',
											allowBlank:false
										},
										{
											xtype: 'numberfield',
											fieldLabel: 'Weight',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											hideTrigger: true,
											anchor: '75%',
											allowBlank:false
										},
										{
											xtype: 'numberfield',
											fieldLabel: 'Height',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											hideTrigger: true,
											anchor: '75%',
											allowBlank:false
										},
										{
											xtype: 'radiogroup',
											fieldLabel: 'Sex',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '65%',
											allowBlank:false,
											items: [
												{
													xtype: 'radiofield',
													name: 'sex',
													boxLabel: 'Male'
												},
												{
													xtype: 'radiofield',
													name: 'sex',
													boxLabel: 'Female'
												},
												{
													xtype: 'radiofield',
													name: 'sex',
													boxLabel: 'Other'
												}
											]
										},
										{
											xtype: 'datefield',
											fieldLabel: 'DOB',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '75%',
											allowBlank:false
										},
										{
											xtype: 'button',
											margin: '10 50 0 270',
											width: 60,
											text: 'Next',
											handler:function(){
														var l = Ext.getCmp('mainregarea').getLayout();
														l.setActiveItem(2);
											}
										},
										{
											xtype: 'button',
											margin: '10 0 0 0',
											width: 60,
											text: 'Reset'
										}
									]
								}
							]
						},
						{
							xtype: 'panel',
							border: 0,
							bodyPadding: 10,
							items: [
								{
									xtype: 'fieldset',
									padding: 10,
									title: 'New Patient Registration (Part 2)',
									items: [
										{
											xtype: 'textfield',
											fieldLabel: 'Reffered by Doctor / Subcenter',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%'
										},
										{
											xtype: 'textfield',
											fieldLabel: 'Patient Registry',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%'
										},
										{
											xtype: 'textfield',
											fieldLabel: 'Accompanying Person (Name)',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%'
										},
										{
											xtype: 'textfield',
											fieldLabel: 'Relationship to Patient',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%'
										},
										{
											xtype: 'textareafield',
											fieldLabel: 'Current Complaint',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%'
										},
										{
											xtype: 'textareafield',
											fieldLabel: 'Remarks',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											anchor: '95%'
										},
										{
											xtype: 'numberfield',
											fieldLabel: 'Accompanying Person (Contact Number)',
											labelAlign: 'right',
											labelPad: 20,
											labelWidth: 250,
											hideTrigger: true,
											anchor: '95%'
										},
										{
											xtype: 'button',
											margin: '10 50 0 270',
											width: 60,
											text: 'Register'
										},
										{
											xtype: 'button',
											margin: '10 0 0 0',
											width: 60,
											text: 'Cancel',
											handler:function(){
														var l = Ext.getCmp('mainregarea').getLayout();
														l.setActiveItem(0);
											}
										}
									]
								}
							]
						}
					]
				}
			]
		}
	]
    });
	
	
});
