/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * A simple element that adds extra horizontal space between items in a toolbar.
 * By default a 2px wide space is added via CSS specification:
 *
 *     .x-toolbar .x-toolbar-spacer {
 *         width: 2px;
 *     }
 *
 * Example:
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Toolbar Spacer Example',
 *         width: 300,
 *         height: 200,
 *         tbar : [
 *             'Item 1',
 *             { xtype: 'tbspacer' }, // or ' '
 *             'Item 2',
 *             // space width is also configurable via javascript
 *             { xtype: 'tbspacer', width: 50 }, // add a 50px space
 *             'Item 3'
 *         ],
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.toolbar.Spacer', {
    extend: 'Ext.Component',
    alias: 'widget.tbspacer',
    alternateClassName: 'Ext.Toolbar.Spacer',
    baseCls: Ext.baseCSSPrefix + 'toolbar-spacer',
    focusable: false
});
