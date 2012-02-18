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