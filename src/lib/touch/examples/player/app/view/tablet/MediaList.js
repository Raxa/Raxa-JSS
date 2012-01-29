Ext.define('Player.view.tablet.MediaList', {
    extend : 'Ext.dataview.List',
    xtype  : 'tablet-medialist',

    requires : [
        'Ext.XTemplate',
        'Player.store.Media'
    ],

    config : {
        cls              : 'media-list',
        onItemDisclosure : true,
        store            : 'Media',
        itemTpl          : new Ext.XTemplate(
            '<div class="media-list-name">{name}</div>',
            '<div class="media-list-detail">{type} {[Player.util.Format.timeRenderer(values.duration)]}</div>'
        )
    }
});