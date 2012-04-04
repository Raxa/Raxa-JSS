
Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '../lib/extjs/examples/ux');

Ext.require([
    'Ext.selection.CellModel',
	'Ext.tab.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
	'Ext.form.*',
    'Ext.ux.CheckColumn'
]);

Ext.onReady(function(){

	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	
Ext.define('newdoc', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'newdoc', type: 'string'},
            {name: 'roomno', type: 'int'},
            {name: 'time'}
        ]
    });


    var store = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        model: 'newdoc',
        proxy: {
            type: 'ajax',
            url: 'plants.xml',
            reader: {
                type: 'xml',
                record: 'newdoc'
            }
        },
        sorters: [{
            property: 'common',
            direction:'ASC'
        }]
    });

    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });


    var newdocgrid = Ext.create('Ext.grid.Panel', {
        store: store,
        title: "Today's Doctors",
        stateful: true,
        stateId: 'stateGrid',
		forcefit: true,
		layout: {
			type:'anchor'
		},
        columns: [
            {
                text     : 'Doctor Name',
				flex:1,
                sortable : false,
				align: 'center', 
                dataIndex: 'newdoc',
				editor: {
					allowBlank: false
				}
            },
            {
                text     : 'Room No.',
				flex:1,
                sortable : true,
				align: 'center', 
                dataIndex: 'roomno',
				editor: {
					xtype: 'combobox',
					typeAhead: true,
					triggerAction: 'all',
					selectOnTab: true,
					store: [
						['1','1'],
						['2','2'],
						['3','3'],
						['4','4'],
						['5','5'],
						['6','6'],
						['7','7'],
						['8','8'],
						['9','9'],
						['10','10']
					],
					lazyRender: true,
					listClass: 'x-combo-list-small'
				}				
            },
            {
                text     : 'Time',
				flex:1,
                sortable : true,
				align: 'center', 
                dataIndex: 'time',
				editor: {
					xtype: 'timefield',
					typeAhead: true,
				}
            }
        ],
		tbar: [{
            text: 'Add newdoc',
            handler : function(){
                var r = Ext.create('newdoc', {
                    newdoc: 'New Doc',
                    roomno: '0',
                    time: '00:00'
                });
                store.insert(0, r);
                cellEditing.startEditByPosition({row: 0, column: 0});
            }
        }],
		bbar: [
			{
				xtype: 'tbfill'
			},
			{
				text: 'Save Details',
				handler:function(){
							var l = Ext.getCmp('mainregarea').getLayout();
							l.setActiveItem(1);
				}
			}
		],
		plugins: [cellEditing]
    });
	
	var myData = [
		['Dr. V. Singh',10,5,'Yes'],
		['Dr. V. Singh',10,5,'Yes'],
		['Dr. V. Singh',10,5,'Yes'],
		['Dr. V. Singh',10,5,'Yes'],
    ];


    var docstore = Ext.create('Ext.data.ArrayStore', {
        fields: [
           {name: 'company'},
           {name: 'price',      type: 'int'},
           {name: 'change',     type: 'int'},
           {name: 'lastChange'}
        ],
        data: myData
    });

    var grid = Ext.create('Ext.grid.Panel', {
        store: docstore,
		height:200,
        title: 'OPD Status',
        stateful: true,
        stateId: 'stateGrid',
		forcefit: true,
		layout: {
			type:'anchor'
		},
        columns: [
            {
                text     : 'Doctor Name',
				flex:1,
                sortable : false,
				align: 'center', 
                dataIndex: 'company'
            },
            {
                text     : 'OPD Room No.',
				flex:1,
                sortable : true,
				align: 'center', 
                dataIndex: 'price'
            },
            {
                text     : 'Patients Waiting in the Queue',
				flex:1,
                sortable : true,
				align: 'center', 
                dataIndex: 'change'
            },
            {
                text     : 'Available..?',
				flex:1,
                sortable : true,
				align: 'center', 
                dataIndex: 'lastChange'
            }
        ],
    });
	
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
							padding: 10,
							layout: {
								type: 'auto'
							},
							items: [
								newdocgrid
							]
						},
						{
							xtype: 'panel',
							border: 0,
							bodyPadding: 10,
							items: [
                                {
                                    xtype: 'fieldset',
                                    height: 130,
                                    layout: {
                                        align: 'stretch',
                                        type: 'hbox'
                                    },
                                    title: 'Patient Details:',
                                    items: [
                                        {
                                            xtype: 'form',
                                            border: 0,
                                            bodyPadding: 10,
                                            flex: 1.5,
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'Reg No',
                                                    hideTrigger: true,
                                                    anchor: '100%'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Name',
                                                    anchor: '100%'
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Sex',
                                                    anchor: '100%',
													defaults: {
														name: 'sex'
													},
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Male'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Female'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'form',
                                            border: 0,
                                            margin: '0 0 0 20',
                                            bodyPadding: 10,
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Label',
                                                    hideLabel: true,
													defaults: {
														name: 'emergency'
													},
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'No Emergency',
															handler:function(){
																var s = Ext.getCmp('postnoemergency');
																s.setDisabled(false);
															}
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Emergency',
															handler:function(){
																var sa = Ext.getCmp('postemergency');
																sa.setDisabled(false);
															}
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Label',
                                                    hideLabel: true,
													defaults: {
														name: 'type'
													},
													id:'postemergency',
													disabled:true,
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'OPD Emergency'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'IPD/Casualty'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Label',
													defaults: {
														name: 'mode'
													},
													id:'postnoemergency',
													disabled:true,
                                                    hideLabel: true,
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Consultation'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            boxLabel: 'Surgery'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    margin: '10 0 0 300',
                                    width: 60,
                                    text: 'Save',
									handler:function(){
												var l = Ext.getCmp('mainregarea').getLayout();
												l.setActiveItem(2);
									}
                                },
                                {
                                    xtype: 'button',
                                    margin: '10 0 0 20',
                                    width: 60,
                                    text: 'Reset'
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
                                    height: 130,
                                    layout: {
                                        align: 'stretch',
                                        type: 'hbox'
                                    },
                                    title: 'Patient Details:',
                                    items: [
                                        {
                                            xtype: 'form',
                                            border: 0,
                                            bodyPadding: 10,
                                            flex: 1.5,
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'Reg No',
													value: '4005687145',
                                                    readOnly: true,
                                                    hideTrigger: true,
                                                    anchor: '100%'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Name',
													value: 'Arati Singh',
													readOnly: true,
                                                    anchor: '100%'
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Sex',
                                                    anchor: '100%',
													defaults: {
														name: 'sex'
													},
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
															readOnly: true,
                                                            boxLabel: 'Male'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
															readOnly: true,
															checked: true,
                                                            boxLabel: 'Female'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'form',
                                            border: 0,
                                            margin: '0 0 0 20',
                                            bodyPadding: 10,
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Label',
                                                    hideLabel: true,
													defaults: {
														name: 'emergency'
													},
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
															readOnly: true,
															checked: true,
															id:'noeditnoemergency',
                                                            boxLabel: 'No Emergency'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
															readOnly: true,
															id:'noeditemergency',
                                                            boxLabel: 'Emergency'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Label',
                                                    hideLabel: true,
													id:'noeditpostemergency',
													defaults: {
														name: 'type'
													},
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
															readOnly: true,
															checked: true,
                                                            boxLabel: 'OPD Emergency'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
															readOnly: true,
                                                            boxLabel: 'IPD/Casualty'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    fieldLabel: 'Label',
													defaults: {
														name: 'mode'
													},
                                                    hideLabel: true,
													id:'noeditpostnoemergency',
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
															readOnly: true,
															checked: true,
                                                            boxLabel: 'Consultation'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
															readOnly: true,
                                                            boxLabel: 'Surgery'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    height: 140,
                                    title: 'Enter Doctor\'s Detail ',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Doctor Name',
                                            anchor: '60%'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'OPD room no.',
                                            hideTrigger: true,
                                            anchor: '60%'
                                        },
                                        {
                                            xtype: 'textareafield',
                                            fieldLabel: 'Comments',
                                            anchor: '60%'
                                        }
                                    ]
                                },
                                grid,
                                {
                                    xtype: 'button',
                                    margin: '10 0 0 300',
                                    width: 60,
                                    text: 'Save',
									handler:function(){
												var l = Ext.getCmp('mainregarea').getLayout();
												l.setActiveItem(0);
									}
                                },
                                {
                                    xtype: 'button',
                                    margin: '10 0 0 20',
                                    width: 60,
                                    text: 'Reset'
                                }
                            ]
						}
					]
				}
			]
		}
	]
    });
	
	
	var c1 = Ext.getCmp('noeditemergency');
	var c2 = Ext.getCmp('noeditpostemergency');
	var c3 = Ext.getCmp('noeditnoemergency');
	var c4 = Ext.getCmp('noeditpostnoemergency');
	
	if(c1.checked == true)
		c4.setVisible(false);
		
	if(c3.checked == true)
		c2.setVisible(false);
	
});
