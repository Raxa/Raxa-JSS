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