oreilly.cfg = {};

oreilly.OfflineStore = new Ext.data.Store({
    model: 'OfflineData',
    autoLoad: true
});

oreilly.SpeakerStore = new Ext.data.Store({
    model: 'Speaker',
    
    getGroupString: function(r){
        return r.get('last_name')[0]
    }
});

oreilly.App = Ext.extend(Ext.TabPanel, {
    
    fullscreen: true,
    
    tabBar: {
        ui: 'gray',
        dock: 'bottom',
        layout: { pack: 'center' }
    },
    
    cardSwitchAnimation: false,
    
    initComponent: function() {

        if (navigator.onLine) {
            this.items = [{
                xtype: 'sessionlist',
                iconCls: 'time',
                title: 'Sessions',
                confTitle: this.title,
                shortUrl: this.shortUrl
            }, {
                title: 'Speakers',
                iconCls: 'team1',
                xtype: 'speakerlist'
            }, {
                title: 'Tweets',
                iconCls: 'chat',
                xtype: 'tweetlist',
                hashtag: this.twitterSearch
            }, {
                title: 'Location',
                iconCls: 'locate',
                xtype: 'location',
                coords: this.gmapCoords,
                mapText: this.gmapText,
                permLink: this.gmapLink,
            }, {
                title: 'About',
                xtype: 'aboutlist',
                iconCls: 'info',
                pages: this.aboutPages
            }];
        } else {
            this.on('render', function(){
                this.el.mask('No internet connection.');
            }, this);
        }
        
        oreilly.cfg = {};
        oreilly.cfg.shortUrl = this.shortUrl;
        oreilly.cfg.title = this.title;
        
        oreilly.App.superclass.initComponent.call(this);
    }
    
});