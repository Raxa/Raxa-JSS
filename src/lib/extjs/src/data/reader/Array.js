/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @author Ed Spencer
 * @class Ext.data.reader.Array
 * @extends Ext.data.reader.Json
 * 
 * <p>Data reader class to create an Array of {@link Ext.data.Model} objects from an Array.
 * Each element of that Array represents a row of data fields. The
 * fields are pulled into a Record object using as a subscript, the <code>mapping</code> property
 * of the field definition if it exists, or the field's ordinal position in the definition.</p>
 * 
 * <p><u>Example code:</u></p>
 * 
<pre><code>
Employee = Ext.define('Employee', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        {name: 'name', mapping: 1},         // "mapping" only needed if an "id" field is present which
        {name: 'occupation', mapping: 2}    // precludes using the ordinal position as the index.        
    ]
});

var myReader = new Ext.data.reader.Array({
    model: 'Employee'
}, Employee);
</code></pre>
 * 
 * <p>This would consume an Array like this:</p>
 * 
<pre><code>
[ [1, 'Bill', 'Gardener'], [2, 'Ben', 'Horticulturalist'] ]
</code></pre>
 * 
 * @constructor
 * Create a new ArrayReader
 * @param {Object} meta Metadata configuration options.
 */
Ext.define('Ext.data.reader.Array', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'Ext.data.ArrayReader',
    alias : 'reader.array',

    /**
     * @private
     * Most of the work is done for us by JsonReader, but we need to overwrite the field accessors to just
     * reference the correct position in the array.
     */
    buildExtractors: function() {
        this.callParent(arguments);
        
        var fields = this.model.prototype.fields.items,
            i = 0,
            length = fields.length,
            extractorFunctions = [],
            map;
        
        for (; i < length; i++) {
            map = fields[i].mapping;
            extractorFunctions.push(function(index) {
                return function(data) {
                    return data[index];
                };
            }(map !== null ? map : i));
        }
        
        this.extractorFunctions = extractorFunctions;
    }
});

