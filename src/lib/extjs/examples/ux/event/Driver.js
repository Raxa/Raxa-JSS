/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Ext.ux.event.Driver', {
    active: null,

    constructor: function (config) {
        Ext.apply(this, config);
    },

    getTimestamp: function () {
        var d = new Date();
        return d.getTime() - this.startTime;
    },

    onStart: function () {},
    onStop: function () {},

    start: function () {
        var me = this;

        if (!me.active) {
            me.active = new Date();
            me.startTime = me.active.getTime();
            me.onStart();
        }
    },

    stop: function () {
        var me = this;

        if (me.active) {
            me.active = null;
            me.onStop();
        }
    }
});

