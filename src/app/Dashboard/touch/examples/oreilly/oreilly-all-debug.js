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
Ext.regModel('Proposal', {
    hasMany: {
        model: 'Speaker',
        name: 'speakers'
    },
    fields: ['id', 'title', 'url', 'description', 'day', 'time', 'end_time', 'pretty_time', 'date', 'topics', 'room', 'proposal_type']
});

Ext.regModel('Speaker', {
    hasMany: {
        model: 'Proposal',
        name: 'proposals'
    },
    fields: ['id', 'first_name', 'last_name', 'name', 'position', 'affiliation', 'bio', 'twitter', 'url', 'photo']
});

Ext.regModel('OfflineData', {
    fields: ['id', 'feedname', 'json'],
    proxy: {type: 'localstorage', id: 'oreillyproxy'}
});

Ext.regModel('Video', {
    fields: ['id', 'author', 'video']
});

Ext.regModel('Tweet', {
    fields: ['id', 'text', 'to_user_id', 'from_user', 'created_at', 'profile_image_url']
});
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
oreilly.views.SessionList = Ext.extend(Ext.Panel, {
    layout: 'card',
    groupByDay: true,
    hasInitializedDate: false,
    startDateIndex: 0,
    initComponent: function() {
        
        this.list = new Ext.List({
            grouped: true,
            itemTpl: '<span class="name">{title}</span> <span class="secondary">{room}</span>',
            loadingText: false,
            store: new Ext.data.Store({
                model: 'Proposal',
                sorters: 'time',
                getGroupString: function(r){
                    return r.get('pretty_time');
                },
                proxy: {
                    type: 'scripttag',
                    url : 'https://en.oreilly.com/' + this.shortUrl + '/public/mobile_app/all',
                    reader: {
                        type: 'json',
                        root: 'proposals'
                    }
                },
                listeners: {
                    load: { fn: this.initializeData, scope: this }
                }
            })
        });
        
        this.list.on('selectionchange', this.onSelect, this);
        
        this.list.on('render', function(){
            this.list.store.load();
            this.list.el.mask('<span class="top"></span><span class="right"></span><span class="bottom"></span><span class="left"></span>', 'x-spinner', false);
        }, this);
        
        this.listpanel = new Ext.Panel({
            items: this.list,
            layout: 'fit',
            dockedItems: [{
                xtype: 'toolbar',
                title: this.confTitle
            }],
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                }, scope: this }
            }
        })
        
        this.items = this.listpanel;
        
        this.on('activate', this.checkActiveDate, this);
        
        oreilly.views.SessionList.superclass.initComponent.call(this);
    },
    
    checkActiveDate: function(){
        if (!this.hasInitializedDate && this.dateButtons) {
            var currentTime = new Date(),
                month = currentTime.getMonth() + 1,
                day = currentTime.getDate(),
                year = currentTime.getFullYear();
            
            var dateIndex = this.dateButtons.items.findIndex('dateData', month+'/'+day+'/'+year);
            
            if (dateIndex !== -1) this.startDateIndex = dateIndex;
            
            this.dateButtons.setPressed(this.startDateIndex);
            this.changeDate(this.dateButtons.items.getAt(this.startDateIndex));
            this.doComponentLayout();
            this.hasInitializedDate = true;
        }
    },
    
    initializeData: function(data) {

        // First fill the sessions to the speaker store
        var speakers = [],
            length   = data.data.items.length,
            proposal, i;
        
        for (i = 0; i < length; i++) {
            proposal = data.data.items[i];
            
            proposal.speakers().each(function(speaker) {
                speaker.proposals().add(proposal);
                speakers.push(speaker);
            });
        }

        oreilly.SpeakerStore.add.apply(oreilly.SpeakerStore, speakers);
        oreilly.SpeakerStore.sort('last_name');

        if (this.groupByDay) {
            
            // Gather dates, create a splitbutton around them
            var dates = data.collect('date'),
                buttons = [],
                length  = dates.length,
                i;

            for (i = 0; i < length; i++) {
                buttons.push({
                    text: dates[i].substr(0, 5),
                    dateData: dates[i],
                    index: i,
                    scope: this,
                    handler: this.changeDate
                });
            }
            
            this.dateButtons = new Ext.SegmentedButton({
                items: buttons,
                defaults: { flex: 1 },
                style: 'width: 100%'
            });
            
            this.listpanel.addDocked({
                xtype: 'toolbar',
                ui: 'gray',
                items: this.dateButtons,
                layout: { pack: 'center' }
            });
            
            // Take off the spinner
            this.list.el.unmask();
            
            if (this.listpanel.isVisible()) {
                this.checkActiveDate();
            }
        }
    },
    
    changeDate: function(btn) {
        this.list.store.clearFilter();
        this.list.store.filter('date', btn.dateData);
        this.list.scroller.scrollTo({y: 0}, false);
    },
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new oreilly.views.SessionDetail({
                prevCard: this.listpanel,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            this.setActiveItem(sessionCard, 'slide');
        }
    }
});

Ext.reg('sessionlist', oreilly.views.SessionList);
oreilly.views.SpeakerList = Ext.extend(Ext.Panel, {
    layout: 'card',
    
    initComponent: function() {
        
        this.list = new Ext.List({
            grouped: true,
            indexBar: true,
            itemTpl: '<div class="avatar"<tpl if="photo"> style="background-image: url({photo})"</tpl>></div><span class="name">{name}<tpl if="position || affiliation"><br /><span class="tertiary">{position}<tpl if="affiliation">, {affiliation}</tpl></span></tpl></span>',
            store: oreilly.SpeakerStore,
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            }
        });
        
        this.listpanel = new Ext.Panel({
            layout: 'fit',
            items: this.list,
            dockedItems: [{
                xtype: 'toolbar',
                title: 'Speakers'
            }],
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                }, scope: this }
            }
        });
        
        this.items = this.listpanel;
        
        oreilly.views.SpeakerList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
            
            var bioCard = new oreilly.views.SpeakerDetail({
                prevCard: this.listpanel,
                record: records[0]
            });
            
            this.setActiveItem(bioCard, 'slide');
        }
    }
});

Ext.reg('speakerlist', oreilly.views.SpeakerList);
oreilly.views.HtmlPage = Ext.extend(Ext.Panel, {
    autoLoad: 'about.html',
    scroll: 'vertical',
    styleHtmlContent: true,
    initComponent: function(){
        
        var toolbarBase = {
            xtype: 'toolbar',
            title: this.title
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = {
                ui: 'back',
                text: this.prevCard.title,
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
                }
            }
        }
        
        this.dockedItems = toolbarBase;
        
        Ext.Ajax.request({
            url: this.url,
            success: function(rs){
                this.update(rs.responseText);
            },
            scope: this
        });
        oreilly.views.HtmlPage.superclass.initComponent.call(this);
    }
});

Ext.reg('htmlpage', oreilly.views.HtmlPage);
oreilly.views.SpeakerDetail = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    showSessionData: true,
    initComponent: function(){
        this.dockedItems = [{
            xtype: 'toolbar',
            title: this.record.data.name,
            items: [{
                ui: 'back',
                text: 'Back',
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
            }]
        }];
        
        this.items = [{
            styleHtmlContent: true,
            tpl: new Ext.XTemplate( '<div class="bio_overview"><div class="avatar"<tpl if="photo"> style="background-image: url({photo})"</tpl>></div><h3>{name}</h3><h4>{position}, {affiliation}</h4></div> {bio}'),
            data: this.record.data
        }];
        
        if (this.record.proposalsStore && this.showSessionData) {
            this.sessionList = new Ext.List({
                singleSelect: true,
                itemTpl: '<span class="name">{title}</span><span class="secondary">{room}</span>',
                store: this.record.proposals(),
                scroll: false,
                autoHeight: true,
                style: 'width: 100%;'
            });
            this.sessionList.on('selectionchange', this.viewSession, this)
            this.items.push({
                xtype: 'toolbar',
                title: 'Sessions',
                ui: 'gray',
                cls: 'small_title'
            });
            this.items.push(this.sessionList);
        };
        
        this.listeners = {
            activate: { fn: function(){
                if (this.sessionList) {
                    this.sessionList.getSelectionModel().deselectAll();
                }
            }, scope: this }
        };
        
        oreilly.views.SpeakerDetail.superclass.initComponent.call(this);
    },
    
    viewSession: function(selectModel, records){
        if (records[0] !== undefined) {
            var sessionCard = new oreilly.views.SessionDetail({
                prevCard: this,
                record: records[0],
                showSpeakerData: false
            });
            this.ownerCt.setActiveItem(sessionCard, 'slide');
        }
    }
});

Ext.reg('speakerdetail', oreilly.views.SpeakerDetail);
oreilly.views.SessionDetail = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    showSpeakerData: true,
    cls: 'session-detail',
    initComponent: function(){
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                ui: 'back',
                text: 'Back',
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
            }
            // TODO: Reimplement faves
            
            // , {xtype: 'spacer'}, {
            //     iconCls: 'star',
            //     cls: 'favestar' + (oreilly.faveStore.find('proposal_id', this.record.data.id) == -1 ? '' : ' favorited'),
            //     iconMask: true,
            //     ui: 'plain',
            //     scope: this,
            //     handler: function(btn){
            //         var idx = oreilly.faveStore.find('proposal_id', this.record.data.id);
            //         if (idx == -1) {
            //             oreilly.faveStore.create({
            //                 proposal_id: this.record.data.id
            //             });
            //             btn.addCls('favorited');
            //         } else {
            //             oreilly.faveStore.removeAt(idx);
            //             oreilly.faveStore.sync();
            //             btn.removeCls('favorited');
            //         }
            //     }
            // }
            ]
        }];
        
        this.items = [{
            tpl: new Ext.XTemplate( '<h3>{title} <small>{room}</small></h3><h4 class="subdata">{proposal_type} at {pretty_time}, {date}</h4> {description}'),
            data: this.record.data,
            styleHtmlContent: true
        }];
        
        if (this.record.speakers() && this.showSpeakerData) {
            var speakers = this.record.speakers();
            
            this.speakerList = new Ext.List({
                itemTpl: '<div class="avatar"<tpl if="photo"> style="background-image: url({photo})"</tpl>></div><span class="name">{name}<tpl if="position || affiliation"><br /><span class="tertiary">{position}<tpl if="affiliation">, {affiliation}</tpl></span></tpl></span>',
                store: speakers,
                listeners: {
                    selectionchange: {fn: this.onSpeakerSelect, scope: this}
                },
                scroll: false,
                autoHeight: true,
                style: 'width: 100%;'
            });
            
            this.items.push({
                xtype: 'toolbar',
                title: 'Speaker' + (( speakers.data.items.length == 1 ) ? '' : 's'),
                ui: 'gray',
                cls: 'small_title'
            })
            this.items.push(this.speakerList);
            Ext.repaint();
        }
        
        this.listeners = {
            activate: { fn: function(){
                if (this.speakerList) {
                    this.speakerList.getSelectionModel().deselectAll();
                }
            }, scope: this }
        };
        
        oreilly.views.SessionDetail.superclass.initComponent.call(this);
    },
    
    onSpeakerSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var speakerCard = new oreilly.views.SpeakerDetail({
                prevCard: this,
                record: records[0],
                showSessionData: false
            });

            // Tell the parent panel to animate to the new card
            this.ownerCt.setActiveItem(speakerCard, 'slide');
        }
    }
});

Ext.reg('SessionDetail', oreilly.views.SessionDetail);
oreilly.views.LocationMap = Ext.extend(Ext.Panel, {
    coords: [37.788115, -122.402222],
    mapText: '',
    permLink: '',
    initComponent: function(){
        
        var position = new google.maps.LatLng(this.coords[0], this.coords[1]);
        
        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Location',
            items: [{xtype: 'spacer', flex: 1}, {
                ui: 'plain',
                iconCls: 'action',
                iconMask: true,
                scope: this,
                handler: function(){
                    
                    Ext.Msg.confirm('External Link', 'Open in Google Maps?', function(res){
                        if (res == 'yes') window.location = this.permLink;
                    }, this);
                }
            }]
        }]
        
        var infowindow = new google.maps.InfoWindow({
            content: this.mapText
        });
        
        this.map = new Ext.Map({
            mapOptions : {
                center : position,  //nearby San Fran
                zoom: 12,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender : function(comp, map){
                    var marker = new google.maps.Marker({
                         position: position,
                         title : 'Sencha HQ',
                         map: map
                    });

                    infowindow.open(map, marker);

                    google.maps.event.addListener(marker, 'click', function() {
                         infowindow.open(map, marker);
                    });
                }
            }
        });
        
        this.items = this.map;
        
        oreilly.views.LocationMap.superclass.initComponent.call(this);
    }
});

Ext.reg('location', oreilly.views.LocationMap);
oreilly.views.AboutList = Ext.extend(Ext.Panel, {
    layout: 'card',
    initComponent: function(){
        
        this.list = new Ext.List({
            itemTpl: '<div class="page">{title}</div>',
            ui: 'round',
            store: new Ext.data.Store({
                fields: ['name', 'card'],
                data: this.pages
            }),
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            },
            title: 'About'
        });
        
        this.listpanel = new Ext.Panel({
            title: 'About',
            items: this.list,
            layout: 'fit',
            dockedItems: {
                xtype: 'toolbar',
                title: 'About'
            }
        })
        
        this.listpanel.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);
        
        this.items = [this.listpanel];
        
        oreilly.views.AboutList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
            var newCard = Ext.apply({}, records[0].data.card, { 
                prevCard: this.listpanel,
                title: records[0].data.title
            });
            
            this.setActiveItem(Ext.create(newCard), 'slide');
        }
    }
});

Ext.reg('aboutlist', oreilly.views.AboutList);
oreilly.views.VideoList = Ext.extend(Ext.Panel, {
    layout: 'card',
    
    playlist_id: null,
    hideText: '',
    
    initComponent: function(){
        
        var toolbarBase = {
            xtype: 'toolbar',
            title: 'Videos'
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = [{
                ui: 'back',
                text: this.prevCard.title,
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
                }
            }]
        }
        
        this.dockedItems = toolbarBase;
        
        if (this.playlist_id === null) {
            console.warn('No Youtube playlist ID provided.');
        }
        else
        {
            this.list = new Ext.List({
                itemTpl: '<div class="thumb" style="background-image: url({video.thumbnail.sqDefault})"></div><span class="name">{[values.video.title.replace("' + this.hideText + ': ","")]}</span>',
                loadingText: false,
                store: new Ext.data.Store({
                    model: 'Video',
                    autoLoad: true,
                    proxy: {
                        type: 'scripttag',
                        url : 'http://gdata.youtube.com/feeds/api/playlists/' + this.playlist_id + '?v=2&alt=jsonc',
                        reader: {
                            type: 'json',
                            root: 'data.items'
                        }
                    }
                }),
                listeners: {
                    selectionchange: {fn: this.onSelect, scope: this}
                }
            });
            
            this.items = this.list;
        }
        
        oreilly.views.VideoList.superclass.initComponent.call(this);
    },
    
    onSelect: function(selectModel, records){

        if (records[0] !== undefined) {

            Ext.Msg.confirm('External Link', 'Open in YouTube?', function(res){
                if (res == 'yes') {
                    window.location = 'http://www.youtube.com/watch?v=' + records[0].data.video.id + '&feature=player_embedded';
                }
                
                selectModel.deselectAll();
            }, this);
            
        }
    }
});

Ext.reg('videolist', oreilly.views.VideoList);
oreilly.views.TweetList = Ext.extend(Ext.Panel, {
    hashtag: '',
    layout: 'fit',
    initComponent: function(){
        
        var toolbarBase = {
            xtype: 'toolbar',
            title: this.hashtag
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = [{
                ui: 'back',
                text: this.prevCard.title,
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
                }
            }, { xtype: 'spacer', flex: 1 }, {
                iconCls: 'action',
                iconMask: true,
                scope: this,
                ui: 'plain',
                handler: function(){
                    Ext.Msg.confirm('External Link', 'Open search in Twitter?', function(res){
                        if (res == 'yes') {
                            window.location = 'http://search.twitter.com/search?q=' + escape(this.hashtag);
                        }
                    }, this);
                }
            }]
        }
        
        this.dockedItems = toolbarBase;
        
        this.list = new Ext.List({
            itemTpl: new Ext.XTemplate('<div class="avatar"<tpl if="profile_image_url"> style="background-image: url({profile_image_url})"</tpl>></div> <div class="tweet"><strong>{from_user}</strong><tpl if="to_user"> &raquo; {to_user}</tpl><br />{text:this.linkify}</div>', {
                linkify: function(value) {
                    return value.replace(/(http:\/\/[^\s]*)/g, "<span class=\"link\" href=\"$1\">$1</span>");
                }
            }),
            loadingText: false,
            store: new Ext.data.Store({
                model: 'Tweet',
                proxy: {
                    type: 'scripttag',
                    url : 'http://search.twitter.com/search.json',
                    reader: {
                        type: 'json',
                        root: 'results'
                    }
                }
            }),
            listeners: {
                selectionchange: { fn: this.selectTweet, scope: this }
            }
        });
        
        this.items = [this.list];
        
        this.list.on('afterrender', this.loadStore, this);
        
        oreilly.views.TweetList.superclass.initComponent.call(this);
    },
    
    selectTweet: function(sel, records){
        if (records[0]) {
            Ext.Msg.confirm('External Link', 'Open tweet in Twitter?', function(res){
                if (res == 'yes') {
                    window.location = 'http://twitter.com/' + records[0].data.from_user + '/status/' + records[0].data.id
                }
                
                sel.deselectAll();
            }, this);
        }
    },
    
    loadStore: function(){
        
        this.list.el.mask('<span class="top"></span><span class="right"></span><span class="bottom"></span><span class="left"></span>', 'x-spinner', false);
        
        this.list.store.load({
            params: {
                q: this.hashtag
            },
            callback: function(data){
                this.list.el.unmask();
            },
            scope: this
        });
        
    }
});

Ext.reg('tweetlist', oreilly.views.TweetList);

