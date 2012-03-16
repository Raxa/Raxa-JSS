/**
* @class twitter.views.TimeLine
* @extends Ext.List
*
* The TimeLine component is a very simple DataView which just defines a template, loading text and empty text. It is
* passed a Tweet store when rendered and simply displays each tweet next to the tweeter's image.
*
* In the configured template we render each tweet into a div, and at the bottom add a special 'nextPage' div. We set
* up a tap listener on that div to load the next page of data.
*
*/
twitter.views.TimeLine = Ext.extend(Ext.List, {
    cls: 'timeline',
    emptyText   : '<p class="no-searches">No tweets found matching that search</p>',

    disableSelection: true,

    plugins: [
        {
            ptype: 'listpaging',
            autoPaging: false
        }, {
            ptype: 'pullrefresh'
        }
    ],

    itemCls: 'tweet',
    itemTpl: new Ext.XTemplate(
        '<img src="{profile_image_url}" />',

        '<div class="x-tweetanchor"></div>',
        '<div class="tweet-bubble">',
            '<div class="tweet-content">',
                '<h2>{from_user}</h2>',
                '<p>{text:this.linkify}</p><strong></strong>',
                '<span class="posted">{created_at}</span>',
            '</div>',
        '</div>',
        {
            /**
             * Simply wraps a link tag around each detected url
             */
            linkify: function(value) {
                return value.replace(/(http:\/\/[^\s]*)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
            }
        }
    )
});

Ext.reg('tweetsList', twitter.views.TimeLine);
