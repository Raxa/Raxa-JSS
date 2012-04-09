/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * A non-rendering placeholder item which instructs the Toolbar's Layout to begin using
 * the right-justified button container.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *          title: 'Toolbar Fill Example',
 *          width: 300,
 *          height: 200,
 *          tbar : [
 *              'Item 1',
 *              { xtype: 'tbfill' },
 *              'Item 2'
 *          ],
 *          renderTo: Ext.getBody()
 *      });
 */
Ext.define('Ext.toolbar.Fill', {
    extend: 'Ext.Component',
    alias: 'widget.tbfill',
    alternateClassName: 'Ext.Toolbar.Fill',
    isFill : true,
    flex: 1
});
