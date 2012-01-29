Ext.Loader.setPath({
    'Ext.data': '../../src/data'
});

Ext.require([
    'Ext.data.TreeStore',
    'Ext.NestedList'
]);

Ext.define('File', {
    extend: 'Ext.data.Model',
    config: {
        // idProperty: 'id',
        fields: [
            {name: 'id',       type: 'string'},
            {name: 'fileName', type: 'string'}
        ]
    }
});

Ext.define('Example.SourceView', {
    extend: 'Ext.Panel',
    xtype: 'sourceview',
    config: {
        cls: 'ux-code',
        styleHtmlContent: true,
        scrollable: true
    },
    applyHtml: function(html) {
        this.matches = [];

        var v   = html,
            fmt = '<span class="ux-code-{0}">{1}</span>';

        var between = Ext.Function.bind(function(idx, length) {
            for (var i = 0; i < this.matches.length; i++){
                var m = this.matches[i],
                    s = m[0],
                    e = m[1];
                /*if (s <= idx && (idx + length) <= e){
                    return true;
                }*/
                if ((s <= idx && idx < e) || (s < (idx + length) && (idx + length) <= e)){
                    return true;
                }
            }
            return false;
        }, this);

        var highlight = Ext.Function.bind(function(str, regex, cls, fn){
            regex.compile(regex);
            var match;

            while (match = regex.exec(str)) {
                var mdata = fn ? fn(match) : [match.index, match[0]],
                    midx = mdata[0],
                    mstr = mdata[1];
                if (!between(midx, mstr.length)){
                    var replacement = Ext.util.Format.format(fmt, cls, mstr),
                        diff = (replacement.length - mstr.length);
                    str = str.slice(0, midx) + replacement + str.slice(midx + mstr.length);
                    regex.lastIndex = midx + replacement.length;
                    for (var i = 0; i < this.matches.length; i++){
                        var m = this.matches[i];
                        if (m[1] < midx) continue;

                        m[0] += diff;
                        m[1] += diff;
                    }
                    this.matches.push([midx, regex.lastIndex]);
                }
            }
            return str;
        }, this);

        // Escape HTML...whatever
        var htmlRE = /<(\w+)>/ig, match;
        while (match = htmlRE.exec(v)) {
            v = v.slice(0, match.index) + Ext.util.Format.format('&lt;{0}&gt;', match[1]) + v.slice(match.index + match[0].length);
        }

        // Block comments
        v = highlight(v, /\/\*(.|\s)*?\*\//ig, 'comment');

        // String literals
        v = highlight(v, (/("|')[^\1\n\r]*?\1/ig), 'string');

        // Line comments
        v = highlight(v, /\/\/[^\n\r]*/ig, 'comment');

        // Integers and Floats
        v = highlight(v, /\d+\.?\d*/ig, 'number');

        // Function names
        v = highlight(v, /(\w+)\s*\:\s*function/ig, 'function', function(match){
            return [match.index, match[1]];
        });
        v = highlight(v, /function (\w+)/ig, 'function', function(match){
            return [match.index + 9, match[1]];
        });

        // Keywords
        v = highlight(v, /\b(this|function|null|return|true|false|new|int|float|break|const|continue|delete|do|while|for|in|switch|case|throw|try|catch|typeof|instanceof|var|void|with|yield|if|else)\b/ig, 'keyword');

        // Operators
        v = highlight(v, /\.|\,|\:|\;|\=|\+|\-|\&|\%|\*|\/|\!|\?|\<|\>|\||\^|\~/ig, 'operator');

        return '<pre>' + v + '</pre>';
    }
});

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        var store = Ext.create('Ext.data.TreeStore', {
            model: 'File',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'source.json'
            }
        });

        Ext.create('Ext.NestedList', {
            fullscreen: true,
            title: 'src/',
            displayField: 'fileName',
            // add a / for folder nodes in title/back button
            getTitleTextTpl: function() {
                return '{' + this.getDisplayField() + '}<tpl if="leaf !== true">/</tpl>';
            },
            // add a / for folder nodes in the list
            getItemTextTpl: function() {
                return '{' + this.getDisplayField() + '}<tpl if="leaf !== true">/</tpl>';
            },
            // provide a codebox for each source file
            detailCard: new Example.SourceView(),
            store: store,
            listeners: {
                leafitemtap: function(me, list, index, item, e) {
                    var store = list.getStore(),
                        record  = store.getAt(index),
                        detailCard = me.getDetailCard();

                    list.setMasked({
                        message: 'Loading'
                    });

                    Ext.Ajax.request({
                        url: '../../src/' + record.get('id'),
                        success: function(response) {
                            detailCard.setHtml(response.responseText);
                            list.unmask();
                        },
                        failure: function() {
                            detailCard.setHtml("Loading failed.");
                            list.unmask();
                        }
                    });

                }
            }
        });
    }
});
