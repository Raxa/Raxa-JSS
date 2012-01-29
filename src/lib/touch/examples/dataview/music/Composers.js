Ext.define('Music.view.Composers', {
    extend: 'Ext.List',
    store: 'Music.store.Composers',
    
    grouped: true,
    
    //this would also be nice
    grouped: {
        field: 'name',
        firstLetter: true,
        indexBar: true,
        
        //this would be the default renderer
        renderer: function(groupName) {
            return groupName;
        }
    },
    
    itemTpl: [
        '<div class="composer">',
            '<img src="{albumArtSmall}" />',
            '<h2>{name}</h2>',
            '<span>{albumCount} albums, {songCount} songs</span>',
        '</div>'
    ]
});