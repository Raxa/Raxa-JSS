/*

This file is part of Sencha Touch 2

Copyright (c) 2012 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: !/[?&](cache|breakpoint)/i.test(window.location.search)
});


