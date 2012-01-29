Ext.define('Player.model.Media', {
    extend : 'Ext.data.Model',

    config : {
        fields : [
            'name',
            'type',
            'duration',
            'location',
            'screen'
        ]
    }
});