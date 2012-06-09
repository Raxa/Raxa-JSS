/**
 * Demonstrates a 'cover' card transition, which shows a new item by sliding it over the top of the 
 * current item, in this case starting from the top
 */
Ext.define('Kitchensink.view.CoverDown', {
    extend: 'Ext.Panel',
    requires: ['Kitchensink.view.LoremIpsum'],
    config: {
        cls: 'card card4',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Cover Down Animation'
        }, {
            xtype: 'loremipsum'
        }]
    }
});