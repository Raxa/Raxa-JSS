/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @private
 * @class Ext.layout.component.field.HtmlEditor
 * @extends Ext.layout.component.field.Field
 * Layout class for {@link Ext.form.field.HtmlEditor} fields. Sizes the toolbar, textarea, and iframe elements.
 * @private
 */

Ext.define('Ext.layout.component.field.HtmlEditor', {
    extend: 'Ext.layout.component.field.Field',
    alias: ['layout.htmleditor'],

    type: 'htmleditor',

    sizeBodyContents: function(width, height) {
        var me = this,
            owner = me.owner,
            bodyEl = owner.bodyEl,
            toolbar = owner.getToolbar(),
            textarea = owner.textareaEl,
            iframe = owner.iframeEl,
            editorHeight;

        if (Ext.isNumber(width)) {
            width -= bodyEl.getFrameWidth('lr');
        }
        toolbar.setWidth(width);
        textarea.setWidth(width);
        iframe.setWidth(width);

        // If fixed height, subtract toolbar height from the input area height
        if (Ext.isNumber(height)) {
            editorHeight = height - toolbar.getHeight() - bodyEl.getFrameWidth('tb');
            textarea.setHeight(editorHeight);
            iframe.setHeight(editorHeight);
        }
    }
});
