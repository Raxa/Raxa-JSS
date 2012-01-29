Ext.define('Music.view.Albums', {
    extend: 'Ext.DataView',
    items: [{
        albumArtLarge: 'Music.store.Albums',
        name: 'Pretty Hate Machine',
        artistName: 'Nine Inch Nails'
    }],

    itemTpl: [
        '<div class="album">',
            '<img src={albumArtLarge} />',
            '<h3>{name}</h3>',
            '<p>{artistName}</p>' //should be artist.name
        '</div>'
    ]
});