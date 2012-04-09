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
 * @class Ext.layout.component.field.TextArea
 * @extends Ext.layout.component.field.Field
 * Layout class for {@link Ext.form.field.TextArea} fields. Handles sizing the textarea field.
 */
Ext.define('Ext.layout.component.field.TextArea', {
    extend: 'Ext.layout.component.field.Text',
    alias: 'layout.textareafield',

    type: 'textareafield',


    /**
     * Given the target bodyEl dimensions, adjust them if necessary to return the correct final
     * size based on the text field's {@link Ext.form.field.Text#grow grow config}. Overrides the
     * textfield layout's implementation to handle height rather than width.
     * @param {Number} width The bodyEl width
     * @param {Number} height The bodyEl height
     * @return {Number[]} [inputElWidth, inputElHeight]
     */
    adjustForGrow: function(width, height) {
        var me = this,
            owner = me.owner,
            inputEl, value, max,
            curWidth, curHeight, calcHeight,
            result = [width, height];

        if (owner.grow) {
            inputEl = owner.inputEl;
            curWidth = inputEl.getWidth(true); //subtract border/padding to get the available width for the text
            curHeight = inputEl.getHeight();

            // Get and normalize the field value for measurement
            value = inputEl.dom.value || '&#160;';
            value += owner.growAppend;

            // Translate newlines to <br> tags
            value = value.replace(/\n/g, '<br>');

            // Find the height that contains the whole text value
            calcHeight = Ext.util.TextMetrics.measure(inputEl, value, curWidth).height +
                         inputEl.getBorderWidth("tb") + inputEl.getPadding("tb");

            // Constrain
            max = owner.growMax;
            if (Ext.isNumber(height)) {
                max = Math.min(max, height);
            }
            result[1] = Ext.Number.constrain(calcHeight, owner.growMin, max);
        }

        return result;
    }

});
