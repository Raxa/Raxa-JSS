/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
if (!(Ext.core && Ext.core.Element)){
    var describe = function(){}; // clobber Jasmine's describe to skip these tests
    throw new Error('Ext.core.Element is missing. You must run the DOM jsBuilder script before all these tests can run');
}

