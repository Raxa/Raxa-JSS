Ext.define('RaxaEmr.Outpatient.store.opdObs', {
    requires: ['RaxaEmr.Outpatient.model.Observation'],
    id: 'opdObservations',
    extend: 'Ext.data.Store',
    config: {
        model: 'RaxaEmr.Outpatient.model.Observation',
    }
});
