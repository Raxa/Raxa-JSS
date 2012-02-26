/**
 * This is a stripped down version of the Twitter example to
 * illustrate the 'List Paging' and 'Pull Refresh' plugins
 */
Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady : function() {

        Ext.regModel("Tweet", {
            fields: [
                {name: "id",                type: "int"},
                {name: "text",              type: "string"},
                {name: "from_user",         type: "string"},
                {name: "profile_image_url", type: "string"}
            ],

            proxy: 'twitter'
        });

        Ext.regModel("Search", {
            fields: [
                {name: "id",    type: "int"},
                {name: "query", type: "string"}
            ],

            hasMany: {
                model: "Tweet",
                name : 'tweets',
                filterProperty: 'query',
                storeConfig: {
                    pageSize: 10,
                    remoteFilter: true,
                    clearOnPageLoad: false
                }
            },

            proxy: {
                type: 'localstorage',
                id  : 'twitter-searches'
            }
        });

        var searchModel = Ext.ModelMgr.getModel("Search");
        var search = new searchModel({
            query: "sencha"
        });

        var store = search.tweets();

        var tweetList = {
            cls: 'timeline',
            emptyText   : '<p class="no-searches">No tweets found matching that search</p>',

            disableSelection: true,

            store: store,

            plugins: [{
                ptype: 'listpaging',
                autoPaging: false
            }, {
                ptype: 'pullrefresh'
            }],

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
                    linkify: function(value) {
                        return value.replace(/(http:\/\/[^\s]*)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
                    }
                }
            )
        };

        if (!Ext.is.Phone) {
            new Ext.List(Ext.apply(tweetList, {
                floating: true,
                width: 350,
                height: 370,
                centered: true,
                modal: true,
                hideOnMaskTap: false
            })).show();
        }
        else {
            new Ext.List(Ext.apply(tweetList, {
                fullscreen: true
            }));
        }

        store.load();
    }
});
