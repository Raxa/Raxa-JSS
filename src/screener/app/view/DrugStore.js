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
                    label: 'Drug',
                    name: 'drug',
                    cls: 'selectfield',
                    width: 250,
                    store: Ext.create('Screener.store.druglist')
                }, {
                    xtype: 'selectfield',
                    label: 'Strength',
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
                    label: 'Quantity',
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
                    label: 'Duration',
                    name: 'duration',
                    options: [{
                        text: 'one week',
                        value: '1w'
                    }, {
                        text: 'one month',
                        value: '1m'
                    }, {
                        text: 'two months',
                        value: '2m'
                    }]
                }, {
                    xtype: 'selectfield',
                    labelAlign: 'top',
                    label: 'Frequency',
                    cls: 'selectfield',
                    name: 'frequency',
                    flex: 1,
                    options: [{
                        text: 'once a day',
                        value: 'ond'
                    }, {
                        text: 'twice a day',
                        value: 'bd'
                    }, {
                        text: 'thrice a day',
                        value: 'tri'
                    }, {
                        text: 'as required',
                        value: 'req'
                    }]
                
                }]
            }, {
                xtype: 'textareafield',
                id: 'instruction',
                cls: 'textarea',
                label: 'Order of medication',
                name: 'Instruction',
                labelAlign: 'top',
                height: '100px'
            }]
        }]
    }
});