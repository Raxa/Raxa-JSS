Ext.define('RaxaEmr.Outpatient.view.patient.treatmentsummery', {
    extend: 'Ext.dataview.List',
    xtype: 'Treatment-Summery',
    config: {
        store: 'drugpanel',
        itemTpl: ['<div>{drugname} {strength} mg</br>{dosage} {instruction}</br>Continue for {duration} days</div>']
    }

});