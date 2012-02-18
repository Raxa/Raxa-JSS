/**
 * @author Ed Spencer
 * @class Ext.data.JsonReader
 * @extends Ext.data.Reader
 * 
 * <p>The JSON Reader is used by a Proxy to read a server response that is sent back in JSON format. This usually
 * happens as a result of loading a Store - for example we might create something like this:</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: ['id', 'name', 'email']
});

var store = new Ext.data.Store({
    model: 'User',
    proxy: {
        type: 'ajax',
        url : 'users.json',
        reader: {
            type: 'json'
        }
    }
});
</code></pre>
 * 
 * <p>The example above creates a 'User' model. Models are explained in the {@link Ext.data.Model Model} docs if you're
 * not already familiar with them.</p>
 * 
 * <p>We created the simplest type of JSON Reader possible by simply telling our {@link Ext.data.Store Store}'s 
 * {@link Ext.data.Proxy Proxy} that we want a JSON Reader. The Store automatically passes the configured model to the
 * Store, so it is as if we passed this instead:
 * 
<pre><code>
reader: {
    type : 'json',
    model: 'User'
}
</code></pre>
 * 
 * <p>The reader we set up is ready to read data from our server - at the moment it will accept a response like this:</p>
 * 
<pre><code>
[
    {
        "id": 1,
        "name": "Ed Spencer",
        "email": "ed@sencha.com"
    },
    {
        "id": 2,
        "name": "Abe Elias",
        "email": "abe@sencha.com"
    }
]
</code></pre>
 * 
 * <p><u>Reading other JSON formats</u></p>
 * 
 * <p>If you already have your JSON format defined and it doesn't look quite like what we have above, you can usually
 * pass JsonReader a couple of configuration options to make it parse your format. For example, we can use the 
 * {@link #root} configuration to parse data that comes back like this:</p>
 * 
<pre><code>
{
    "users": [
       {
           "id": 1,
           "name": "Ed Spencer",
           "email": "ed@sencha.com"
       },
       {
           "id": 2,
           "name": "Abe Elias",
           "email": "abe@sencha.com"
       }
    ]
}
</code></pre>
 * 
 * <p>To parse this we just pass in a {@link #root} configuration that matches the 'users' above:</p>
 * 
<pre><code>
reader: {
    type: 'json',
    root: 'users'
}
</code></pre>
 * 
 * <p>Sometimes the JSON structure is even more complicated. Document databases like CouchDB often provide metadata
 * around each record inside a nested structure like this:</p>
 * 
<pre><code>
{
    "total": 122,
    "offset": 0,
    "users": [
        {
            "id": "ed-spencer-1",
            "value": 1,
            "user": {
                "id": 1,
                "name": "Ed Spencer",
                "email": "ed@sencha.com"
            }
        }
    ]
}
</code></pre>
 * 
 * <p>In the case above the record data is nested an additional level inside the "users" array as each "user" item has
 * additional metadata surrounding it ('id' and 'value' in this case). To parse data out of each "user" item in the 
 * JSON above we need to specify the {@link #record} configuration like this:</p>
 * 
<pre><code>
reader: {
    type  : 'json',
    root  : 'users',
    record: 'user'
}
</code></pre>
 * 
 * <p><u>Response metadata</u></p>
 * 
 * <p>The server can return additional data in its response, such as the {@link #totalProperty total number of records} 
 * and the {@link #successProperty success status of the response}. These are typically included in the JSON response
 * like this:</p>
 * 
<pre><code>
{
    "total": 100,
    "success": true,
    "users": [
        {
            "id": 1,
            "name": "Ed Spencer",
            "email": "ed@sencha.com"
        }
    ]
}
</code></pre>
 * 
 * <p>If these properties are present in the JSON response they can be parsed out by the JsonReader and used by the
 * Store that loaded it. We can set up the names of these properties by specifying a final pair of configuration 
 * options:</p>
 * 
<pre><code>
reader: {
    type : 'json',
    root : 'users',
    totalProperty  : 'total',
    successProperty: 'success'
}
</code></pre>
 * 
 * <p>These final options are not necessary to make the Reader work, but can be useful when the server needs to report
 * an error or if it needs to indicate that there is a lot of data available of which only a subset is currently being
 * returned.</p>
 */
Ext.data.JsonReader = Ext.extend(Ext.data.Reader, {
    root: '',
    
    /**
     * @cfg {String} record The optional location within the JSON response that the record data itself can be found at.
     * See the JsonReader intro docs for more details. This is not often needed and defaults to undefined.
     */
    
    /**
     * Reads a JSON object and returns a ResultSet. Uses the internal getTotal and getSuccess extractors to
     * retrieve meta data from the response, and extractData to turn the JSON data into model instances.
     * @param {Object} data The raw JSON data
     * @return {Ext.data.ResultSet} A ResultSet containing model instances and meta data about the results
     */
    readRecords: function(data) {
        //this has to be before the call to super because we use the meta data in the superclass readRecords
        if (data.metaData) {
            this.onMetaChange(data.metaData);
        }

        /**
         * DEPRECATED - will be removed in Ext JS 5.0. This is just a copy of this.rawData - use that instead
         * @property jsonData
         * @type Mixed
         */
        this.jsonData = data;

        return Ext.data.JsonReader.superclass.readRecords.call(this, data);
    },

    //inherit docs
    getResponseData: function(response) {
        try {
            var data = Ext.decode(response.responseText);
        }
        catch (ex) {
            throw 'Ext.data.JsonReader.getResponseData: Unable to parse JSON returned by Server.';
        }

        if (!data) {
            throw 'Ext.data.JsonReader.getResponseData: JSON object not found';
        }

        return data;
    },

    //inherit docs
    buildExtractors : function() {
        Ext.data.JsonReader.superclass.buildExtractors.apply(this, arguments);

        if (this.root) {
            this.getRoot = this.createAccessor(this.root);
        } else {
            this.getRoot = function(root) {
                return root;
            };
        }
    },
    
    /**
     * @private
     * We're just preparing the data for the superclass by pulling out the record objects we want. If a {@link #record}
     * was specified we have to pull those out of the larger JSON object, which is most of what this function is doing
     * @param {Object} root The JSON root node
     * @return {Array} The records
     */
    extractData: function(root, returnRecords) {
        var recordName = this.record,
            data = [],
            length, i;
        
        if (recordName) {
            length = root.length;
            
            for (i = 0; i < length; i++) {
                data[i] = root[i][recordName];
            }
        } else {
            data = root;
        }
        
        return Ext.data.JsonReader.superclass.extractData.call(this, data, returnRecords);
    },

    /**
     * @private
     * Returns an accessor function for the given property string. Gives support for properties such as the following:
     * 'someProperty'
     * 'some.property'
     * 'some["property"]'
     * This is used by buildExtractors to create optimized extractor functions when casting raw data into model instances.
     */
    createAccessor: function() {
        var re = /[\[\.]/;

        return function(expr) {
            if (Ext.isEmpty(expr)) {
                return Ext.emptyFn;
            }
            if (Ext.isFunction(expr)) {
                return expr;
            }
            var i = String(expr).search(re);
            if (i >= 0) {
                return new Function('obj', 'return obj' + (i > 0 ? '.' : '') + expr);
            }
            return function(obj) {
                return obj[expr];
            };
        };
    }()
});

Ext.data.ReaderMgr.registerType('json', Ext.data.JsonReader);