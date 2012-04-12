/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.ux.PreviewPlugin
 * @extends Ext.AbstractPlugin
 *
 * The Preview enables you to show a configurable preview of a record.
 *
 * This plugin assumes that it has control over the features used for this
 * particular grid section and may conflict with other plugins.
 * 
 * @alias plugin.preview
 * @ptype preview
 */
Ext.define('Ext.ux.PreviewPlugin', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.preview',
    requires: ['Ext.grid.feature.RowBody', 'Ext.grid.feature.RowWrap'],
    
    // private, css class to use to hide the body
    hideBodyCls: 'x-grid-row-body-hidden',
    
    /**
     * @cfg {String} bodyField
     * Field to display in the preview. Must me a field within the Model definition
     * that the store is using.
     */
    bodyField: '',
    
    /**
     * @cfg {Boolean} previewExpanded
     */
    previewExpanded: true,
    
    constructor: function(config) {
        this.callParent(arguments);
        var bodyField   = this.bodyField,
            hideBodyCls = this.hideBodyCls,
            section     = this.getCmp(),
            features = [{
                ftype: 'rowbody',
                getAdditionalData: function(data, idx, record, orig, view) {
                    var o = Ext.grid.feature.RowBody.prototype.getAdditionalData.apply(this, arguments);
                    Ext.apply(o, {
                        rowBody: data[bodyField],
                        rowBodyCls: section.previewExpanded ? '' : hideBodyCls
                    });
                    return o;
                }
            },{
                ftype: 'rowwrap'
            }];
        
        section.previewExpanded = this.previewExpanded;
        if (!section.features) {
            section.features = [];
        }
        section.features = features.concat(section.features);
    },
    
    /**
     * Toggle between the preview being expanded/hidden
     * @param {Boolean} expanded Pass true to expand the record and false to not show the preview.
     */
    toggleExpanded: function(expanded) {
        var view = this.getCmp();
        this.previewExpanded = view.previewExpanded = expanded;
        view.refresh();
    }
});
