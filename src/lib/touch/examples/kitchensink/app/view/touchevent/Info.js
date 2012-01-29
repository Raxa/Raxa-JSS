Ext.define('Kitchensink.view.touchevent.Info', {
    extend: 'Ext.Component',
    xtype: 'toucheventinfo',
    
    config: {
        styleHtmlContent: true,
        html: [
            '<p>Sencha Touch comes with a multitude of touch events available on components. Included touch events that can be used are:</p>',
            '<ul>',
                '<li>touchstart</li>',
                '<li>touchmove</li>',
                '<li>touchend</li>',
                '<li>scrollstart</li>',
                '<li>scroll</li>',
                '<li>scrollend</li>',
                '<li>singletap</li>',
                '<li>tap</li>',
                '<li>doubletap</li>',
                '<li>taphold</li>',
                '<li>swipe</li>',
                '<li>pinch</li>',
            '</ul>'
        ].join('')
    }
});