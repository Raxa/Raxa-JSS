/**
 * Demonstrates a 'cover' card transition, which shows a new item by sliding it over the top of the
 * current item, in this case starting from the left
 */
Ext.define('Kitchensink.view.CoverLeft', {
    extend: 'Ext.Panel',
    requires: ['Kitchensink.view.LoremIpsum2'],
    config: {
        cls: 'card card1',
        scrollable: true,
        items: [{
            docked: 'top',
            html: 'Cover Left Animation'
        }, {
            xtype: 'loremipsum2'
        }]
    }
});