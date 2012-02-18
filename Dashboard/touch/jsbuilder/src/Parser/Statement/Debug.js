Loader.require('Parser.Statement.If');

Parser.Statement.Debug = Ext.extend(Parser.Statement.If, {
    constructor: function() {
        Parser.Statement.Debug.superclass.constructor.apply(this, arguments);

        this.setProperty('debug', true);
    }
});