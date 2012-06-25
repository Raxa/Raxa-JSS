Ext.define('RaxaEmr.Outpatient.model.drugpanel', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['drugname', 'strength', 'instruction', 'dosage', 'routeofadministration', 'duration']
    }
});