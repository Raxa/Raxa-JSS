/**
 * @author Ed Spencer
 * @class Ext.data.XmlWriter
 * @extends Ext.data.Writer
 * 
 * <p>Writer that outputs model data in XML format</p>
 */
Ext.data.XmlWriter = Ext.extend(Ext.data.Writer, {
    /**
     * @cfg {String} documentRoot The name of the root element of the document. Defaults to <tt>'xmlData'</tt>.
     */
    documentRoot: 'xmlData',

    /**
     * @cfg {String} header A header to use in the XML document (such as setting the encoding or version).
     * Defaults to <tt>''</tt>.
     */
    header: '',

    /**
     * @cfg {String} record The name of the node to use for each record. Defaults to <tt>'record'</tt>.
     */
    record: 'record',

    //inherit docs
    writeRecords: function(request, data) {
        var tpl = this.buildTpl(request, data);

        request.xmlData = tpl.apply(data);

        return request;
    },

    buildTpl: function(request, data) {
        if (this.tpl) {
            return this.tpl;
        }

        var tpl = [],
            root = this.documentRoot,
            record = this.record,
            first,
            key;

        if (this.header) {
            tpl.push(this.header);
        }
        tpl.push('<', root, '>');
        if (data.length > 0) {
            tpl.push('<tpl for="."><', record, '>');
            first = data[0];
            for (key in first) {
                if (first.hasOwnProperty(key)) {
                    tpl.push('<', key, '>{', key, '}</', key, '>');
                }
            }
            tpl.push('</', record, '></tpl>');
        }
        tpl.push('</', root, '>');
        this.tpl = new Ext.XTemplate(tpl.join(''));
        return this.tpl;
    }
});

Ext.data.WriterMgr.registerType('xml', Ext.data.XmlWriter);
/**
 * @author Ed Spencer
 * @class Ext.data.XmlReader
 * @extends Ext.data.Reader
 * 
 * 
 * <p>The XML Reader is used by a Proxy to read a server response that is sent back in XML format. This usually
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
        url : 'users.xml',
        reader: {
            type: 'xml',
            record: 'user'
        }
    }
});
</code></pre>
 * 
 * <p>The example above creates a 'User' model. Models are explained in the {@link Ext.data.Model Model} docs if you're
 * not already familiar with them.</p>
 * 
 * <p>We created the simplest type of XML Reader possible by simply telling our {@link Ext.data.Store Store}'s 
 * {@link Ext.data.Proxy Proxy} that we want a XML Reader. The Store automatically passes the configured model to the
 * Store, so it is as if we passed this instead:
 * 
<pre><code>
reader: {
    type : 'xml',
    model: 'User',
    record: 'user'
}
</code></pre>
 * 
 * <p>The reader we set up is ready to read data from our server - at the moment it will accept a response like this:</p>
 *
<pre><code>
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;user&gt;
    &lt;id&gt;1&lt;/id&gt;
    &lt;name&gt;Ed Spencer&lt;/name&gt;
    &lt;email&gt;ed@sencha.com&lt;/email&gt;
&lt;/user&gt;
&lt;user&gt;
    &lt;id&gt;2&lt;/id&gt;
    &lt;name&gt;Abe Elias&lt;/name&gt;
    &lt;email&gt;abe@sencha.com&lt;/email&gt;
&lt;/user&gt;
</code></pre>
 * 
 * <p>The XML Reader uses the configured {@link #record} option to pull out the data for each record - in this case we
 * set record to 'user', so each &lt;user&gt; above will be converted into a User model.</p>
 * 
 * <p><u>Reading other XML formats</u></p>
 * 
 * <p>If you already have your XML format defined and it doesn't look quite like what we have above, you can usually
 * pass XmlReader a couple of configuration options to make it parse your format. For example, we can use the 
 * {@link #root} configuration to parse data that comes back like this:</p>
 * 
<pre><code>
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;users&gt;
    &lt;user&gt;
        &lt;id&gt;1&lt;/id&gt;
        &lt;name&gt;Ed Spencer&lt;/name&gt;
        &lt;email&gt;ed@sencha.com&lt;/email&gt;
    &lt;/user&gt;
    &lt;user&gt;
        &lt;id&gt;2&lt;/id&gt;
        &lt;name&gt;Abe Elias&lt;/name&gt;
        &lt;email&gt;abe@sencha.com&lt;/email&gt;
    &lt;/user&gt;
&lt;/users&gt;
</code></pre>
 * 
 * <p>To parse this we just pass in a {@link #root} configuration that matches the 'users' above:</p>
 * 
<pre><code>
reader: {
    type  : 'xml',
    root  : 'users',
    record: 'user'
}
</code></pre>
 * 
 * <p>Note that XmlReader doesn't care whether your {@link #root} and {@link #record} elements are nested deep inside
 * a larger structure, so a response like this will still work:
 * 
<pre><code>
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;deeply&gt;
    &lt;nested&gt;
        &lt;xml&gt;
            &lt;users&gt;
                &lt;user&gt;
                    &lt;id&gt;1&lt;/id&gt;
                    &lt;name&gt;Ed Spencer&lt;/name&gt;
                    &lt;email&gt;ed@sencha.com&lt;/email&gt;
                &lt;/user&gt;
                &lt;user&gt;
                    &lt;id&gt;2&lt;/id&gt;
                    &lt;name&gt;Abe Elias&lt;/name&gt;
                    &lt;email&gt;abe@sencha.com&lt;/email&gt;
                &lt;/user&gt;
            &lt;/users&gt;
        &lt;/xml&gt;
    &lt;/nested&gt;
&lt;/deeply&gt;
</code></pre>
 * 
 * <p><u>Response metadata</u></p>
 * 
 * <p>The server can return additional data in its response, such as the {@link #totalProperty total number of records} 
 * and the {@link #successProperty success status of the response}. These are typically included in the XML response
 * like this:</p>
 * 
<pre><code>
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;total&gt;100&lt;/total&gt;
&lt;success&gt;true&lt;/success&gt;
&lt;users&gt;
    &lt;user&gt;
        &lt;id&gt;1&lt;/id&gt;
        &lt;name&gt;Ed Spencer&lt;/name&gt;
        &lt;email&gt;ed@sencha.com&lt;/email&gt;
    &lt;/user&gt;
    &lt;user&gt;
        &lt;id&gt;2&lt;/id&gt;
        &lt;name&gt;Abe Elias&lt;/name&gt;
        &lt;email&gt;abe@sencha.com&lt;/email&gt;
    &lt;/user&gt;
&lt;/users&gt;
</code></pre>
 * 
 * <p>If these properties are present in the XML response they can be parsed out by the XmlReader and used by the
 * Store that loaded it. We can set up the names of these properties by specifying a final pair of configuration 
 * options:</p>
 * 
<pre><code>
reader: {
    type: 'xml',
    root: 'users',
    totalProperty  : 'total',
    successProperty: 'success'
}
</code></pre>
 * 
 * <p>These final options are not necessary to make the Reader work, but can be useful when the server needs to report
 * an error or if it needs to indicate that there is a lot of data available of which only a subset is currently being
 * returned.</p>
 * 
 * <p><u>Response format</u></p>
 * 
 * <p><b>Note:</b> in order for the browser to parse a returned XML document, the Content-Type header in the HTTP 
 * response must be set to "text/xml" or "application/xml". This is very important - the XmlReader will not
 * work correctly otherwise.</p>
 */
Ext.data.XmlReader = Ext.extend(Ext.data.Reader, {
    /*
     * @private
     * Creates a function to return some particular key of data from a response. The totalProperty and
     * successProperty are treated as special cases for type casting, everything else is just a simple selector.
     * @param {String} key
     * @return {Function}
     */

    /**
     * @cfg {String} record The DomQuery path to the repeated element which contains record information.
     * <b>This is an alias for the {@link #root} config option.</b>
     */

    createAccessor: function() {
        var selectValue = function(key, root, defaultValue){
            var node = Ext.DomQuery.selectNode(key, root),
                val;
            if (node && node.firstChild) {
                val = node.firstChild.nodeValue;
            }
            return Ext.isEmpty(val) ? defaultValue : val;
        };

        return function(key) {
            var fn;

            if (key == this.totalProperty) {
                fn = function(root, defaultValue) {
                    var value = selectValue(key, root, defaultValue);
                    return parseFloat(value);
                };
            }

            else if (key == this.successProperty) {
                fn = function(root, defaultValue) {
                    var value = selectValue(key, root, true);
                    return (value !== false && value !== 'false');
                };
            }

            else {
                fn = function(root, defaultValue) {
                    return selectValue(key, root, defaultValue);
                };
            }

            return fn;
        };
    }(),

    //inherit docs
    getResponseData: function(response) {
        var xml = response.responseXML;

        if (!xml) {
            throw {message: 'Ext.data.XmlReader.read: XML data not found'};
        }

        return xml;
    },

    /**
     * Normalizes the data object
     * @param {Object} data The raw data object
     * @return {Object} Returns the documentElement property of the data object if present, or the same object if not
     */
    getData: function(data) {
        return data.documentElement || data;
    },

    /**
     * @private
     * Given an XML object, returns the Element that represents the root as configured by the Reader's meta data
     * @param {Object} data The XML data object
     * @return {Element} The root node element
     */
    getRoot: function(data) {
        var nodeName = data.nodeName,
            root     = this.root;
        
        if (!root || (nodeName && nodeName == root)) {
            return data;
        } else {
            return Ext.DomQuery.selectNode(root, data);
        }
    },


    //EVERYTHING BELOW THIS LINE WILL BE DEPRECATED IN EXT JS 5.0


    /**
     * @cfg {String} idPath DEPRECATED - this will be removed in Ext JS 5.0. Please use idProperty instead
     */

    /**
     * @cfg {String} id DEPRECATED - this will be removed in Ext JS 5.0. Please use idProperty instead
     */

    /**
     * @cfg {String} success DEPRECATED - this will be removed in Ext JS 5.0. Please use successProperty instead
     */

    /**
     * @constructor
     * @ignore
     * TODO: This can be removed in 5.0 as all it does is support some deprecated config
     */
    constructor: function(config) {
        config = config || {};

        // backwards compat, convert idPath or id / success
        // DEPRECATED - remove this in 5.0

        Ext.applyIf(config, {
            idProperty     : config.idPath || config.id,
            successProperty: config.success
        });
        
        Ext.data.XmlReader.superclass.constructor.call(this, config);
    },
    
    /**
     * @private
     * We're just preparing the data for the superclass by pulling out the record nodes we want
     * @param {Element} root The XML root node
     * @return {Array} The records
     */
    extractData: function(root, returnRecords) {
        var recordName = this.record;
        
        if (recordName != root.nodeName) {
            root = Ext.DomQuery.select(recordName, root);
        } else {
            root = [root];
        }
        
        return Ext.data.XmlReader.superclass.extractData.call(this, root, returnRecords);
    },
    
    /**
     * @private
     * See Ext.data.Reader's getAssociatedDataRoot docs
     * @param {Mixed} data The raw data object
     * @param {String} associationName The name of the association to get data for (uses associationKey if present)
     * @return {Mixed} The root
     */
    getAssociatedDataRoot: function(data, associationName) {
        return Ext.DomQuery.select(associationName, data)[0];
    },

    /**
     * Parses an XML document and returns a ResultSet containing the model instances
     * @param {Object} doc Parsed XML document
     * @return {Ext.data.ResultSet} The parsed result set
     */
    readRecords: function(doc) {
        //it's possible that we get passed an array here by associations. Make sure we strip that out (see Ext.data.Reader#readAssociated)
        if (Ext.isArray(doc)) {
            doc = doc[0];
        }
        
        /**
         * DEPRECATED - will be removed in Ext JS 5.0. This is just a copy of this.rawData - use that instead
         * @property xmlData
         * @type Object
         */
        this.xmlData = doc;
        
        return Ext.data.XmlReader.superclass.readRecords.call(this, doc);
    }
});

Ext.data.ReaderMgr.registerType('xml', Ext.data.XmlReader);
/**
 * @author Ed Spencer
 * @class Ext.data.XmlStore
 * @extends Ext.data.Store
 * @private
 * @ignore
 * <p>Small helper class to make creating {@link Ext.data.Store}s from XML data easier.
 * A XmlStore will be automatically configured with a {@link Ext.data.XmlReader}.</p>
 * <p>A store configuration would be something like:<pre><code>
var store = new Ext.data.XmlStore({
    // store configs
    autoDestroy: true,
    storeId: 'myStore',
    url: 'sheldon.xml', // automatically configures a HttpProxy
    // reader configs
    record: 'Item', // records will have an "Item" tag
    idPath: 'ASIN',
    totalRecords: '@TotalResults'
    fields: [
        // set up the fields mapping into the xml doc
        // The first needs mapping, the others are very basic
        {name: 'Author', mapping: 'ItemAttributes > Author'},
        'Title', 'Manufacturer', 'ProductGroup'
    ]
});
 * </code></pre></p>
 * <p>This store is configured to consume a returned object of the form:<pre><code>
&#60?xml version="1.0" encoding="UTF-8"?>
&#60ItemSearchResponse xmlns="http://webservices.amazon.com/AWSECommerceService/2009-05-15">
    &#60Items>
        &#60Request>
            &#60IsValid>True&#60/IsValid>
            &#60ItemSearchRequest>
                &#60Author>Sidney Sheldon&#60/Author>
                &#60SearchIndex>Books&#60/SearchIndex>
            &#60/ItemSearchRequest>
        &#60/Request>
        &#60TotalResults>203&#60/TotalResults>
        &#60TotalPages>21&#60/TotalPages>
        &#60Item>
            &#60ASIN>0446355453&#60/ASIN>
            &#60DetailPageURL>
                http://www.amazon.com/
            &#60/DetailPageURL>
            &#60ItemAttributes>
                &#60Author>Sidney Sheldon&#60/Author>
                &#60Manufacturer>Warner Books&#60/Manufacturer>
                &#60ProductGroup>Book&#60/ProductGroup>
                &#60Title>Master of the Game&#60/Title>
            &#60/ItemAttributes>
        &#60/Item>
    &#60/Items>
&#60/ItemSearchResponse>
 * </code></pre>
 * An object literal of this form could also be used as the {@link #data} config option.</p>
 * <p><b>Note:</b> Although not listed here, this class accepts all of the configuration options of 
 * <b>{@link Ext.data.XmlReader XmlReader}</b>.</p>
 * @constructor
 * @param {Object} config
 * @xtype xmlstore
 */
Ext.data.XmlStore = Ext.extend(Ext.data.Store, {
    /**
     * @cfg {Ext.data.DataReader} reader @hide
     */
    constructor: function(config){
        config = config || {};
        config = config || {};
              
        Ext.applyIf(config, {
            proxy: {
                type: 'ajax',
                reader: 'xml',
                writer: 'xml'
            }
        });
        Ext.data.XmlStore.superclass.constructor.call(this, config);
    }
});
Ext.reg('xmlstore', Ext.data.XmlStore);
