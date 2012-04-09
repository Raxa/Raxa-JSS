/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.grid.header.DragZone
 * @extends Ext.dd.DragZone
 * @private
 */
Ext.define('Ext.grid.header.DragZone', {
    extend: 'Ext.dd.DragZone',
    colHeaderCls: Ext.baseCSSPrefix + 'column-header',
    maxProxyWidth: 120,

    constructor: function(headerCt) {
        this.headerCt = headerCt;
        this.ddGroup =  this.getDDGroup();
        this.callParent([headerCt.el]);
        this.proxy.el.addCls(Ext.baseCSSPrefix + 'grid-col-dd');
    },

    getDDGroup: function() {
        return 'header-dd-zone-' + this.headerCt.up('[scrollerOwner]').id;
    },

    getDragData: function(e) {
        var header = e.getTarget('.'+this.colHeaderCls),
            headerCmp;

        if (header) {
            headerCmp = Ext.getCmp(header.id);
            if (!this.headerCt.dragging && headerCmp.draggable && !(headerCmp.isOnLeftEdge(e) || headerCmp.isOnRightEdge(e))) {
                var ddel = document.createElement('div');
                ddel.innerHTML = Ext.getCmp(header.id).text;
                return {
                    ddel: ddel,
                    header: headerCmp
                };
            }
        }
        return false;
    },

    onBeforeDrag: function() {
        return !(this.headerCt.dragging || this.disabled);
    },

    onInitDrag: function() {
        this.headerCt.dragging = true;
        this.callParent(arguments);
    },

    onDragDrop: function() {
        this.headerCt.dragging = false;
        this.callParent(arguments);
    },

    afterRepair: function() {
        this.callParent();
        this.headerCt.dragging = false;
    },

    getRepairXY: function() {
        return this.dragData.header.el.getXY();
    },
    
    disable: function() {
        this.disabled = true;
    },
    
    enable: function() {
        this.disabled = false;
    }
});

