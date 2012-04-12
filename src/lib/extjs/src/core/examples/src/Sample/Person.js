/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Sample.Person', {
    uses: 'Sample.Gun',

    statics: {
        averageIQ: 100
    },

    config: {
        name: 'Unknown',
        gender: 'unknown',
        isCool: false,
        height: 5.8
    },

    constructor: function(config) {
        this.initConfig(config);

        return this;
    },

    eat: function(foodType) {
        alert("I'm eating: " + foodType);

        return this;
    },

    applyScroller: function(scroller) {
        return new Ext.util.Scroller(scroller);
    },

    applyHeight: function(height) {
        return parseFloat(height);
    },

    applyName: function(name) {
        return name || 'Unknown';
    },

    applyGender: function(gender) {
        if (!/^(male|female|gay|lesbian)$/.test(gender)) {
            return 'unknown';
        }

        return gender;
    },

    getAverageIQ: function() {
        return this.self.averageIQ;
    }
});

