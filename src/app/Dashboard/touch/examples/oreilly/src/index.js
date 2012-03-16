Ext.ns('oreilly', 'oreilly.views');

Ext.setup({
    statusBarStyle: 'black',
    onReady: function() {
        oreilly.App = new oreilly.App({
            title: 'Web 2.0 Summit 2010',
            shortUrl: 'web2010',
            
            twitterSearch: '#w2s',
            
            gmapLink: 'http://maps.google.com/maps?client=safari&oe=UTF-8&ie=UTF8&q=palace+hotel+san+francisco&fb=1&gl=us&hq=palace+hotel&hnear=San+Francisco,+CA&hl=en&view=map&cid=18345345755033299855&ved=0CI4BEKUG&ei=etTTTIuXBqj8iwPTmOCDDA&ll=37.788115,-122.402222&spn=0.009818,0.016673&z=16',
            gmapText: 'The Palace Hotel<br /><small>2 New Montgomery Street<br />San Francisco, CA 94105<br />(415) 512-1111</small>',
            gmapCoords: [37.788115, -122.402222],
            
            aboutPages: [{
                title: 'Overview',
                card: {
                    xtype: 'htmlpage',
                    url: 'about.html'
                }
            }, {
                title: 'Sponsors',
                card: {
                    xtype: 'htmlpage',
                    url: 'sponsors.html'
                }
            }, {
                title: 'Credits',
                card: {
                    xtype: 'htmlpage',
                    url: 'credits.html'
                }
            }, {
                title: 'Videos',
                card: {
                    xtype: 'videolist',
                    playlist_id: 'F664D8C553A57C93',
                    hideText: 'Web 2.0 Summit 09'
                }
            }]
        });
    }
});