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