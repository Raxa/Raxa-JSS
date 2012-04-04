/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * Private utility class that manages the internal Shadow cache
 * @private
 */
Ext.define('Ext.ShadowPool', {
    singleton: true,
    requires: ['Ext.DomHelper'],

    markup: function() {
        if (Ext.supports.CSS3BoxShadow) {
            return '<div class="' + Ext.baseCSSPrefix + 'css-shadow" role="presentation"></div>';
        } else if (Ext.isIE) {
            return '<div class="' + Ext.baseCSSPrefix + 'ie-shadow" role="presentation"></div>';
        } else {
            return '<div class="' + Ext.baseCSSPrefix + 'frame-shadow" role="presentation">' +
                '<div class="xst" role="presentation">' +
                    '<div class="xstl" role="presentation"></div>' +
                    '<div class="xstc" role="presentation"></div>' +
                    '<div class="xstr" role="presentation"></div>' +
                '</div>' +
                '<div class="xsc" role="presentation">' +
                    '<div class="xsml" role="presentation"></div>' +
                    '<div class="xsmc" role="presentation"></div>' +
                    '<div class="xsmr" role="presentation"></div>' +
                '</div>' +
                '<div class="xsb" role="presentation">' +
                    '<div class="xsbl" role="presentation"></div>' +
                    '<div class="xsbc" role="presentation"></div>' +
                    '<div class="xsbr" role="presentation"></div>' +
                '</div>' +
            '</div>';
        }
    }(),

    shadows: [],

    pull: function() {
        var sh = this.shadows.shift();
        if (!sh) {
            sh = Ext.get(Ext.DomHelper.insertHtml("beforeBegin", document.body.firstChild, this.markup));
            sh.autoBoxAdjust = false;
        }
        return sh;
    },

    push: function(sh) {
        this.shadows.push(sh);
    },
    
    reset: function() {
        Ext.Array.each(this.shadows, function(shadow) {
            shadow.remove();
        });
        this.shadows = [];
    }
});
