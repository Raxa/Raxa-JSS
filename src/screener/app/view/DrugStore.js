/**
 * This is a drug order form 
 * containing various parameters of placing an order including name,strength,quantity 
 * frequency and duration
 */
Ext.define("Screener.view.DrugStore", {
    xtype: 'drugStore',

    extend: 'Ext.form.Panel',

    requires: ['Ext.tab.Panel', 'Ext.form.FieldSet'],

    config: {
        layout: 'vbox',
        items: [{
            xtype: 'fieldset',
            cls: 'fieldset',
            items: [{
                layout: 'hbox',
                items: [{
                    xtype: 'selectfield',
                    labelAlign: 'top',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.drug'),
                    name: 'drug',
                    cls: 'selectfield',
                    width: 250,
                    store: Ext.create('Screener.store.druglist')
                }, {
                    xtype: 'selectfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.strength'),
                    width: 150,
                    labelAlign: 'top',
                    cls: 'selectfield',
                    name: 'strength',
                    options: [{
                        text: '250 mg',
                        value: '250'
                    }, {
                        text: '500 mg',
                        value: '500'
                    }, {
                        text: '800 mg',
                        value: '800'
                    }]
                }, {
                    xtype: 'selectfield',
                    labelAlign: 'top',
                    width: 100,
                    label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.quant'),
                    name: 'quantity',
                    cls: 'selectfield',
                    options: [{
                        text: '1',
                        value: 1
                    }, {
                        text: '2',
                        value: 2
                    }, {
                        text: '3',
                        value: 3
                    }, {
                        text: '4',
                        value: 4
                    }, {
                        text: '5',
                        value: 5
                    }, {
                        text: '10',
                        value: 10
                    }]
                }]
            }, {
                layout: 'hbox',
                items:[{
                    xtype: 'selectfield',
                    labelAlign: 'top',
                    cls: 'selectfield',
                    flex:1,
                    label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.duration'),
                    name: 'duration',
                    options: [{
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.ow'),
                        value: '1w'
                    }, {
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.om'),
                        value: '1m'
                    }, {
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.tm'),
                        value: '2m'
                    }]
                }, {
                    xtype: 'selectfield',
                    labelAlign: 'top',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.freq'),
                    cls: 'selectfield',
                    name: 'frequency',
                    flex: 1,
                    options: [{
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.ond'),
                        value: 'ond'
                    }, {
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.bd'),
                        value: 'bd'
                    }, {
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.tri'),
                        value: 'tri'
                    }, {
                        text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.asreq'),
                        value: 'req'
                    }]
                
                }]
            }, {
                xtype: 'textareafield',
                id: 'instruction',
                cls: 'textarea',
                label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DrugStore.oom'),
                name: 'Instruction',
                labelAlign: 'top',
                height: '100px'
            }]
        }]
    }
});