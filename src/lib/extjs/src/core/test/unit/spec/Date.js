/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.Date", function() {
    var dateSave,
        dateValue = 0,
        increment = 3;
    
    beforeEach(function() {
        dateSave = Date;

        Date = function() {
            return {
                getTime: function() {
                },
                valueOf: function() {
                    dateValue = dateValue + increment;
                    return dateValue;
                }
            };
        };   
    });
    
    afterEach(function() {
        Date = dateSave;
        increment += 16;
    });
    
    it("should get time elapsed in millisecond between date instantiation", function() {
        var dateA = new Date();
        expect(Ext.Date.getElapsed(dateA)).toEqual(3);
    });
    
    it("should get time elapsed in millisecond between two dates", function() {
        var dateA = new Date(),
            dateB = new Date();
        
        expect(Ext.Date.getElapsed(dateA)).toEqual(19);
    });    
});

