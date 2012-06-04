Ext.define('RaxaEmr.Pharmacy.model.Drug', {
    extend: 'Ext.data.Model',

    fields: ['id', 'drug', 'mimsReference', 'form', 'packSize', 'dispencingInstruct', 'sideTreatment', 'dosage']
});