(function() {
    function appendStyleSheet(url, callback) {
        var head = document.head || document.getElementsByTagName('head')[0],
            firstLink = document.getElementsByTagName('link')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        Ext.Ajax.request({
            url: url,
            success: function(response) {
                style.textContent = response.responseText;

                if (firstLink) {
                    head.insertBefore(style, firstLink);
                } else {
                    head.appendChild(style);
                }

                callback(style.sheet);
            }
        });
    }

    function setActiveSheet(sheet) {
        activeSheet.disabled = true;
        activeSheet = sheet;
        activeSheet.disabled = false;
    }

    var themesData = [
            {id: 'default', name: 'Sencha', file: 'sencha-touch.css'},
            {id: 'apple', name: 'Cupertino', file: 'apple.css'},
            {id: 'android', name: 'Mountain View', file: 'android.css'},
            {id: 'blackberry', name: 'Toronto', file: 'bb6.css'}
        ],
        themeSheets = {},
        styleSheets = Array.prototype.slice.call(document.styleSheets);

    var i, ln, theme, regex, j, subLn, sheet, activeSheet;

    for (i = 0,ln = themesData.length; i < ln; i++) {
        theme = themesData[i];

        regex = new RegExp(Ext.util.Format.escapeRegex(theme.file) + '$');

        for (j = 0,subLn = styleSheets.length; j < subLn; j++) {
            sheet = styleSheets[j];

            if (sheet.href && sheet.href.search(regex) !== -1) {
                themeSheets[theme.id] = sheet;
                activeSheet = sheet;
                break;
            }
        }
    }

    Ext.define('Theme', {
        extend: 'Ext.data.Model',
        config: {
            fields: ['id', 'name', 'file']
        }
    });

    Ext.create('Ext.data.Store', {
        id: 'ThemesStore',
        model: 'Theme',
        data: themesData
    });

    Ext.define('Kitchensink.view.Themes', {
        extend: 'Ext.Container',
        config: {
            title: 'Simple',
            layout: Ext.os.deviceType == 'Phone' ? 'fit' : {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            cls: 'demo-list',
            items: [{
                width: Ext.os.deviceType == 'Phone' ? null : 300,
                height: Ext.os.deviceType == 'Phone' ? null : 500,
                xtype: 'list',
                store: 'ThemesStore',
                itemTpl: '<div class="contact"><strong>{name}</strong></div>',
                listeners: {
                    itemtap: function(list, index) {
                        var me = this,
                            recordData = this.getStore().getAt(index).data;

                        if (!themeSheets[recordData.id]) {
                            me.setMasked({message: 'Loading'});
                            appendStyleSheet("../../resources/css/" + recordData.file, function(sheet) {
                                themeSheets[recordData.id] = sheet;
                                setActiveSheet(sheet);
                                me.setMasked(false);
                            });
                        }
                        else {
                            setActiveSheet(themeSheets[recordData.id]);
                        }
                    }
                }
            }]
        }
    });
})();
