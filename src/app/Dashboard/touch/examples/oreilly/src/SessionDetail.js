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