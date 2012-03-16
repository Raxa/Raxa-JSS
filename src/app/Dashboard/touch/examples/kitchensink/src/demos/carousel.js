demos.Carousel = new Ext.Panel({
    cls: 'cards',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        flex: 1
    },
    items: [{
        xtype: 'carousel',
        items: [{
            html: '<p>Navigate the carousel on this page by swiping left/right.</p>',
            cls: 'card card1'
        },
        {
            html: '<p>Clicking on either side of the indicators below</p>',
            cls: 'card card2'
        },
        {
            html: 'Card #3',
            cls: 'card card3'
        }]
    }, {
        xtype: 'carousel',
        ui: 'light',
        direction: 'vertical',
        items: [{
            html: '<p>Carousels can be vertical and given a <code>ui</code> of &#8216;light&#8217; or &#8216;dark.&#8217;</p>',
            cls: 'card card4'
        },
        {
            html: 'Card #2',
            cls: 'card card5'
        },
        {
            html: 'Card #3',
            cls: 'card card6'
        }]
    }]
});