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

    Ext.regModel('Theme', {
        fields: ['name', 'file']
    });

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

    demos.ThemeStore = new Ext.data.Store({
        model: 'Theme',
        data: themesData
    });

    function setActiveSheet(sheet) {
        activeSheet.disabled = true;
        activeSheet = sheet;
        activeSheet.disabled = false;
    }

    demos.Themes = new Ext.Panel({
        layout: Ext.is.Phone ? 'fit' : {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items: [
            {
                width: Ext.is.Phone ? undefined : 300,
                height: 500,
                xtype: 'list',
                store: demos.ThemeStore,
                itemTpl: '<div class="theme_choice">{name}</div>',
                onItemTap: function(item, index) {
                    var me = this,
                        recordData = this.store.getAt(index).data;

                    if (!themeSheets[recordData.id]) {
                        this.setLoading(true);
                        appendStyleSheet("../../resources/css/" + recordData.file, function(sheet) {
                            themeSheets[recordData.id] = sheet;
                            setActiveSheet(sheet);
                            me.setLoading(false);
                        });
                    }
                    else {
                        setActiveSheet(themeSheets[recordData.id]);
                    }
                }
            }
        ]
    });
})();

