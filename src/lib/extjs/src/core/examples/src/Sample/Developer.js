/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Sample.Developer', {
    extend: 'Sample.Person',

    statics: {
        averageIQ: 120
    },

    config: {
        languages: ['JavaScript', 'C++', 'Python']
    },

    constructor: function(config) {
        this.isGeek = true;

        // Apply a method from the parent class' prototype
        return this.callParent(arguments);
    },

    canCode: function(language) {
        return Ext.Array.contains(this.getLanguages(), language);
    },

    code: function(language) {
        if (!this.canCode(language)) {
            alert("I can't code in: " + language);

            return this;
        }

        alert("I'm coding in: " + language);

        this.eat("Bugs");

        return this;
    },

    clone: function() {
        var self = this.statics(),
            cloned = new self(this.config);

        return cloned;
    }
});

