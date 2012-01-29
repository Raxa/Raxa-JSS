/**
* @class Twitter.view.TweetList
* @extends Ext.dataview.DataView
*
* The TweetList component is a simple dataview which is used to display the tweets returned by the twitter search. It also has
* a toolbar docked at the top which is used in phones to display a back button.
*
* The {@link #defaultType} is a tweetlistitem.
*/
Ext.define('Twitter.view.TweetList', {
    extend: 'Ext.DataView',
    xtype: 'tweetlist',
    requires: ['Twitter.view.TweetListItem'],

    config: {
        ui           : 'timeline',
        defaultType  : 'tweetlistitem',
        allowDeselect: false,
        useComponents: true,

        items: [
            {
                docked: 'top',
                xtype : 'toolbar',
                hidden: true,
                ui    : 'searchbar',
                items: [
                    {
                        xtype: 'button',
                        ui   : 'back',
                        text : 'Searches'
                    }
                ]
            }
        ]
    }
});
