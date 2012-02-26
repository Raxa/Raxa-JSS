Ext.ux.CodeBox = Ext.extend(Ext.Component, {
    scroll: 'vertical',
    cls: 'ux-code',
    fmt: '<span class="ux-code-{0}">{1}</span>',

    highlightCode: function(){
        this.matches = [];
        var v = this.value,
            fmt = this.fmt;
        var between = Ext.createDelegate(function(idx, length) {
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
        
        var highlight = Ext.createDelegate(function(str, regex, cls, fn){
            regex.compile(regex);
            var match;
            while (match = regex.exec(str)){
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
        
        return v;
    },

    getValue: function(){
        return this.value;
    },

    afterRender: function(){
        Ext.ux.CodeBox.superclass.afterRender.apply(this, arguments);

        this.code = this.getTargetEl().createChild({
            tag: 'pre',
            html: this.highlightCode()
        });
    },
    
    setValue: function(code) {
        this.value = code;
        if (this.rendered) {
            this.code.update(this.highlightCode());
        }
    }
});

Ext.reg('codebox', Ext.ux.CodeBox);