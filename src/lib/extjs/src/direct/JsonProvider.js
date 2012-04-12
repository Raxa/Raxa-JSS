/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.direct.JsonProvider
 * @extends Ext.direct.Provider

A base provider for communicating using JSON. This is an abstract class
and should not be instanced directly.

 * @markdown
 * @abstract
 */

Ext.define('Ext.direct.JsonProvider', {

    /* Begin Definitions */

    extend: 'Ext.direct.Provider',

    alias: 'direct.jsonprovider',

    uses: ['Ext.direct.ExceptionEvent'],

    /* End Definitions */

   /**
    * Parse the JSON response
    * @private
    * @param {Object} response The XHR response object
    * @return {Object} The data in the response.
    */
   parseResponse: function(response){
        if (!Ext.isEmpty(response.responseText)) {
            if (Ext.isObject(response.responseText)) {
                return response.responseText;
            }
            return Ext.decode(response.responseText);
        }
        return null;
    },

    /**
     * Creates a set of events based on the XHR response
     * @private
     * @param {Object} response The XHR response
     * @return {Ext.direct.Event[]} An array of Ext.direct.Event
     */
    createEvents: function(response){
        var data = null,
            events = [],
            event,
            i = 0,
            len;

        try{
            data = this.parseResponse(response);
        } catch(e) {
            event = Ext.create('Ext.direct.ExceptionEvent', {
                data: e,
                xhr: response,
                code: Ext.direct.Manager.self.exceptions.PARSE,
                message: 'Error parsing json response: \n\n ' + data
            });
            return [event];
        }

        if (Ext.isArray(data)) {
            for (len = data.length; i < len; ++i) {
                events.push(this.createEvent(data[i]));
            }
        } else {
            events.push(this.createEvent(data));
        }
        return events;
    },

    /**
     * Create an event from a response object
     * @param {Object} response The XHR response object
     * @return {Ext.direct.Event} The event
     */
    createEvent: function(response){
        return Ext.create('direct.' + response.type, response);
    }
});
