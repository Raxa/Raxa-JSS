// Singleton
Parser = new (Ext.extend(Object, {
    START: '//<',
    END: '>',

    params: {},

    parse: function(filename) {
        var stream = new Stream(filename);

        Loader.require('Parser.Statement');
        var ret = (new Parser.Statement()).parse(stream);
        stream.close();

        return ret;
    },

    evaluate: function(name, value) {
        var modifier = null;
        var param = (this.params.hasOwnProperty(name)) ? this.params[name] : false;
        var match;

        if (value == undefined)
            value = true;

        if (Ext.isString(value)) {
            if (match = value.match(/^(\!|<=|>=|<|>)/)) {
                modifier = match[0];
                value = value.slice(modifier.length);
            }

            // Boolean
            if (value === 'true')
                value = true;
            else if (value === 'false')
                value = false;
            // Numeric
            else if (!isNaN(value))
                value = parseFloat(value);
        }

        switch (modifier) {
            case '!':
                return (param != value);
                break;
            case '>':
                return (param > value);
                break;
            case '<':
                return (param < value);
                break;
            case '<=':
                return (param <= value);
                break;
            case '>=':
                return (param >= value);
                break;
            default:
                return (param == value);
        }
    },

    setParams: function(params) {
        this.params = params || {};
    },

    isCloseOf: function(str, statement) {
        if (!statement.type)
            return false;
        
        return str.trim() === (this.START + '/' + ((statement.isInverted) ? '!' : '') + statement.type + this.END);
    },

    isStatement: function(str) {
        str = str.trim();
        return (str.substr(0, this.START.length) == this.START && 
                str.charAt(this.START.length) != '/' &&
                str.substr(-this.END.length) == this.END);
    },

    parseStatementProperties: function(str) {
        var properties = {};

        var expect = function(regexp) {
            var result = str.match(regexp);

            if (result != null) {
                str = str.slice(result[0].length);
                return result[0];
            }

            return null;
        };

        var name, equalSign, valueWrapper, valueCheck, value;

        while (str.length > 0) {
            expect(/^[^\w]+/i);
            name = expect(/^[\w]+/i);

            if (name == null)
                break;
            
            equalSign = expect(/^=/);

            if (equalSign == null) {
                properties[name] = true;
                continue;
            }

            valueWrapper = expect(/^('|")/i);
            valueCheck = valueWrapper || "\\s";

            value = expect(new RegExp('^[^' + valueCheck + ']+'));

            if (valueWrapper != null)
                expect(new RegExp(valueWrapper));

            properties[name] = value;
        }

        return properties;
    },

    parseStatement: function(string) {
        var str = string.trim();

        // Check if it's actually a valid statement
        if (!this.isStatement(str))
            return false;

        str = str.substr(this.START.length, str.length - this.END.length - this.START.length);

        var typeMatch = str.match(/^(\!)?([\w]+)/i);

        if (typeMatch == null) {
            return false;
        }

        var statement = {
            properties: {}
        };
        statement.type = typeMatch[2];
        statement.isInverted = (typeMatch[1] != undefined);

        str = str.substr(typeMatch[0].length, str.length).trim();
        statement.properties = this.parseStatementProperties(str);

        return statement;
    }
}));