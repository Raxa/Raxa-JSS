Ext.define('DataSink.store.Demos', {
    extend  : 'Ext.data.Store',
    requires: ['DataSink.model.Demo'], // @bug if you remove this, the model config below will not try and load it

    config: {
        model: 'DataSink.model.Demo',

        groupField: 'category',

        data: [
            { category: 'Sorting', type: 'Local' },
            { category: 'Sorting', type: 'Remote' },
            { category: 'Associations', type: 'BelongsTo' },
            { category: 'Filtering', type: 'Local' }
        ]
    }
});