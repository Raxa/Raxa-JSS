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
                    Ext.repaint();
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