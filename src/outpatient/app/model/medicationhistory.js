Ext.define('RaxaEmr.Outpatient.model.medicationhistory', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['drugname', 'duration', 'lastfilled', 'prescriber', 'drugreaction', 'dosage', 'routeofadministration']
    }
});