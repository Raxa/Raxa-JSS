Ext.define('RaxaEmr.Pharmacy.view.prescribedDrugs', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.prescribedDrugs',
    id: 'prescribedDrugs',
    height: 300,
    styleHtmlContent: false,
    width: 750,
    store: 'orderStore',
    selType: 'cellmodel',
    cellEditor: Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    }),
    viewConfig: {
        stripeRows: false
    },
    features: [Ext.create('Ext.grid.feature.Grouping',{
                    startCollapsed: true,
                    groupHeaderTpl: 
                    [
                    '{name} ',
                    ]
          })],
    initComponent: function () {    
        var drugEditor = this;
        this.addEvents(['deleteDrug']);
        this.columns = [
        {
            xtype: 'gridcolumn',
            width: 180,
            dataIndex: 'drugName',
            text: 'Name Of drug',
            resizable: false,
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                editable: true,
                store: 'allDrugs',
                id: 'prescriptionDrugPicker',
                displayField: 'text',
                enableKeyEvents: true,
                forceSelection: true,
                listeners: {
                    'focus': {
                        fn: function (comboField) {
                            comboField.expand();
                        }
                        , 
                        scope: this
                    },
                    'select': {
                        fn: function (comboField, records) {
                            var drugUuid = records[0].data.uuid;
                            var row = (Ext.getCmp('prescribedDrugs').getSelectionModel().selection.row);
                            Ext.getStore('orderStore').getAt(row).set('drugUuid', drugUuid);
                        }
                    }
                }
            }
        },
        {
            xtype: 'numbercolumn',
            width: 80,
            dataIndex: 'dosage',
            text: 'Dose (mg/mL)',
            resizable: false,
            editor: {
                xtype: 'numberfield',
                allowDecimals: true,
                allowBlank: true,
                minValue: 0,
                hideTrigger: true
            }
        },
        {
            xtype: 'actioncolumn',
            text: 'Times',
            width: 80,
            renderer: function (value, metadata, record) {
                if (record.get('takeInMorning')) {
                    Ext.getCmp('prescribedDrugs').columns[2].items[0].icon = '../resources/img/sunriseselected.png';
                } else {
                    Ext.getCmp('prescribedDrugs').columns[2].items[0].icon = '../resources/img/sunrise.png';
                }
                if (record.get('takeInDay')) {
                    Ext.getCmp('prescribedDrugs').columns[2].items[1].icon = '../resources/img/sunselected.png';
                } else {
                    Ext.getCmp('prescribedDrugs').columns[2].items[1].icon = '../resources/img/sun.png';
                }
                if (record.get('takeInEvening')) {
                    Ext.getCmp('prescribedDrugs').columns[2].items[2].icon = '../resources/img/sunsetselected.png';
                } else {
                    Ext.getCmp('prescribedDrugs').columns[2].items[2].icon = '../resources/img/sunset.png';
                }
                if (record.get('takeInNight')) {
                    Ext.getCmp('prescribedDrugs').columns[2].items[3].icon = '../resources/img/moonselected.png';
                } else {
                    Ext.getCmp('prescribedDrugs').columns[2].items[3].icon = '../resources/img/moon.png';
                }
            },
            items: [{
                margin: '0 0 0 0',
                icon: '../resources/img/sunrise.png',
                tooltip: 'Morning',
                handler: function(grid, rowIndex, colIndex) {
                    grid.getStore().getAt(rowIndex).data.takeInMorning = !grid.getStore().getAt(rowIndex).data.takeInMorning;
                    Ext.getCmp('prescribedDrugs').getView().refresh();
                }
            },{
                margin: '0 0 0 0',
                icon: '../resources/img/sun.png',
                tooltip: 'Day',
                handler: function(grid, rowIndex, colIndex) {
                    grid.getStore().getAt(rowIndex).data.takeInDay = !grid.getStore().getAt(rowIndex).data.takeInDay;
                    Ext.getCmp('prescribedDrugs').getView().refresh();
                }
            },{
                icon: '../resources/img/sunset.png',
                tooltip: 'Evening',
                handler: function(grid, rowIndex, colIndex) {
                    grid.getStore().getAt(rowIndex).data.takeInEvening = !grid.getStore().getAt(rowIndex).data.takeInEvening;
                    Ext.getCmp('prescribedDrugs').getView().refresh();
                }
            },{
                icon: '../resources/img/moon.png',
                tooltip: 'Night',
                handler: function(grid, rowIndex, colIndex) {
                    grid.getStore().getAt(rowIndex).data.takeInNight = !grid.getStore().getAt(rowIndex).data.takeInNight;
                    Ext.getCmp('prescribedDrugs').getView().refresh();
                }
            }]
        },
        {
            xtype: 'gridcolumn',
            width: 90,
            dataIndex: 'duration',
            text: 'Duration (Days)',
            resizable: false,
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                minValue: 0,
                allowDecimal:false,
                hideTrigger: true
            }
        },
        {
            xtype: 'numbercolumn',
            width: 55,
            dataIndex: 'qty',
            text: 'Qty',
            resizable: false,
            editor: {
                xtype: 'numberfield',
                allowBlank: true,
                minValue: 0,
                allowDecimal:false,
                hideTrigger: true
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Batch No.',
            dataIndex: 'batchQuantity',
            width: 120,
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                editable: true,
                store: Ext.create('RaxaEmr.Pharmacy.store.StockList',{
                    autoLoad: false,
                    storeId: 'prescriptionBatches'
                }),
                displayField: 'batchQuantity',
                forceSelection: true,
                listeners: {
                    //on focus, filter batches to all that are available at current location with same drug name
                    'focus': {
                        fn: function (comboField) {
                            //if any filters exist on main stock list, clear them so we can use it as a master list                            
                            Ext.getStore('StockList').clearFilter();
                            if(localStorage.pharmacyLocation!==null){
                                console.log(comboField.getStore());
                                var selectedDrug = Ext.getCmp('prescribedDrugs').getSelectionModel().lastSelected.data.drugName;
                                comboField.getStore().clearFilter();
                                console.log(comboField.getStore());
                                
                                //only allow batches that are available, have the correct drug, are in the current location, and
                                //haven't yet been assigned to another inventory
                                comboField.getStore().filter(function(record){
                                    var isAvailable = (record.get('status')===RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE);
                                    var isCurrentDrug = (record.get('drugName')===selectedDrug);
                                    var isBatch = (Ext.getStore('StockList').find("batch",record.get('batch'))!==-1);
                                    var isAtLocation = (record.get('location').uuid===localStorage.pharmacyLocation)
                                    console.log(isAvailable+" "+isCurrentDrug+" "+isBatch+" "+isAtLocation);
                                    return isAvailable && isCurrentDrug && isBatch && isAtLocation;
                                });
                                comboField.doQuery(comboField.allQuery, true);
                                comboField.expand();
                                comboField.getStore().updateFields();
                            }
                        }, 
                        scope: this
                    },
                    'select':{
                        fn: function(comboField, records){
                                var batchUuid = records[0].data.uuid;
                                var batch = records[0].data.batch;
                                var row = (Ext.getCmp('prescribedDrugs').getSelectionModel().selection.row);
                                Ext.getStore('orderStore').getAt(row).set('batchUuid', batchUuid);
                                var requiredQuantity = Ext.getStore('orderStore').getAt(row).get('qty');
                                var quantityInBatch = records[0].data.quantity;
                                //if current batch doesn't cover entire quantity required, reduce quantity and add new row
                                if(quantityInBatch < requiredQuantity){
                                    Ext.getStore('orderStore').getAt(row).set('qty', quantityInBatch);
                                    Ext.msg.Alert('Batch is low');
                                }
                            }
                        }
                    }
            }
        },
        {
            xtype: 'gridcolumn',
            width: 120,
            dataIndex: 'instructions',
            text: 'Notes',
            resizable: false,
            editor: {
                xtype: 'textfield',
                allowDecimals: true,
                allowBlank: true
            }
        },{
            xtype: 'actioncolumn',
            width: 22,
            items: [{
                icon: '../resources/img/delete.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    drugEditor.fireEvent('deleteDrug', {
                        rowIndex: rowIndex,
                        colIndex: colIndex
                    });
                }
            }]
        }];
        this.plugins = [this.cellEditor];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            config:{
                align: 'left'
            },
            items: ['->',{
                text: 'Add Drug',
                iconCls: 'icon-add',
                action: 'addDrugToPrescription'
            }]
        }];
        this.callParent(arguments);
    }
});
