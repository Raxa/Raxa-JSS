Ext.regModel('File', {
    idProperty: 'id',
    fields: [
        {name: 'id',       type: 'string'},
        {name: 'fileName', type: 'string'}
    ]
});


Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){

        var store = new Ext.data.TreeStore({
            model: 'File',
            proxy: {
                type: 'ajax',
                url: 'getSourceFiles.php',
                reader: {
                    type: 'tree',
                    root: 'children'
                }
            }
        });


        var nestedList = new Ext.NestedList({
            fullscreen: true,
            title: 'src/',
            displayField: 'fileName',
            // add a / for folder nodes in title/back button
            getTitleTextTpl: function() {
                return '{' + this.displayField + '}<tpl if="leaf !== true">/</tpl>';
            },
            // add a / for folder nodes in the list
            getItemTextTpl: function() {
                return '{' + this.displayField + '}<tpl if="leaf !== true">/</tpl>';
            },
            // provide a codebox for each source file
            getDetailCard: function(record, parentRecord) {
                return new Ext.ux.CodeBox({
                    value: 'Loading...',
                    scroll: {
                        direction: 'both',
                        eventTarget: 'parent'
                    }
                });
            },
            store: store
        });


        nestedList.on('leafitemtap', function(subList, subIdx, el, e, detailCard) {
            var ds = subList.getStore(),
                r  = ds.getAt(subIdx);

            Ext.Ajax.request({
                url: '../../src/' + r.get('id'),
                success: function(response) {
                    detailCard.setValue(response.responseText);
                },
                failure: function() {
                    detailCard.setValue("Loading failed.");
                }
            });
        });
    }
});